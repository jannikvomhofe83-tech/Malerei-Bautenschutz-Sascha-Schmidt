"use client";
import { useRef, useEffect } from "react";
import { gsap, ScrollTrigger } from "../../../utils/gsap";

const FRAME_COUNT = 121;
const framePath = (n) =>
  `/images/frames/frame-${String(n).padStart(4, "0")}.jpg`;

// Letters that get painted over — each word on its own line
const LINES = ["SCROLL", "DOWN"];

// Per-letter micro-variations to look hand-written
const LETTER_STYLE = [
  // S     C      R      O      L      L
  { r: -1.8, y:  2 }, { r:  0.6, y: -1 }, { r: -0.9, y:  1 },
  { r:  1.4, y: -2 }, { r: -0.5, y:  1 }, { r:  0.9, y:  0 },
  // D     O      W      N
  { r: -1.2, y:  1 }, { r:  0.8, y: -1 }, { r: -0.6, y:  2 }, { r:  1.1, y: -1 },
];

// When (as fraction of total frame progress) each letter starts fading.
// Paint covers letters between ~8% and ~50% of frames.
const FADE_START = 0.06; // first letter starts disappearing at 6% frame progress
const FADE_END   = 0.52; // last letter fully gone at 52% frame progress
const FADE_RANGE = 0.08; // each letter fades over 8% of frame progress

export function VideoHero() {
  const sectionRef = useRef(null);
  const stickyRef  = useRef(null);
  const canvasRef  = useRef(null);

  useEffect(() => {
    const canvas  = canvasRef.current;
    const section = sectionRef.current;
    if (!canvas || !section) return;

    const ctx = canvas.getContext("2d");

    const images = new Array(FRAME_COUNT).fill(null);
    let lastImg = null;
    let lastIdx = -1;

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
      if (lastImg) drawImg(lastImg);
    };
    resize();

    const drawImg = (img) => {
      if (!img?.complete || img.naturalWidth === 0) return;
      lastImg = img;
      const sx = canvas.width / img.naturalWidth;
      const sy = canvas.height / img.naturalHeight;
      const s  = Math.max(sx, sy);
      const w  = img.naturalWidth  * s;
      const h  = img.naturalHeight * s;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, (canvas.width - w) / 2, (canvas.height - h) / 2, w, h);
    };

    const draw = (index) => {
      const i = Math.max(0, Math.min(FRAME_COUNT - 1, Math.round(index)));
      if (i === lastIdx) return;
      lastIdx = i;
      const img = images[i];
      if (img?.complete && img.naturalWidth > 0) drawImg(img);
    };

    const load = (i) =>
      new Promise((res) => {
        const img = new Image();
        img.onload  = () => { images[i] = img; res(img); };
        img.onerror = res;
        img.src = framePath(i + 1);
      });

    // Collect all letter elements — left to right order (DOM order = left to right)
    const allLetters = Array.from(section.querySelectorAll(".wall-letter"));
    const shuffled   = allLetters; // no shuffle, keep DOM order (left → right)

    // Assign thresholds per word so both lines fade in the same time window
    const WORD_FADE_END = 0.30; // matches where SCROLL currently ends (user: "perfekt")
    const thresholds = (() => {
      const result = [];
      LINES.forEach((word) => {
        const len = word.length;
        for (let p = 0; p < len; p++) {
          result.push(FADE_START + (p / Math.max(len - 1, 1)) * (WORD_FADE_END - FADE_START));
        }
      });
      result.push(WORD_FADE_END); // arrow fades with the last letters
      return result;
    })();

    const updateLetters = (frameProgress) => {
      shuffled.forEach((letter, i) => {
        const t       = thresholds[i];
        const raw     = (frameProgress - t) / FADE_RANGE;
        const opacity = Math.max(0, Math.min(1, 1 - raw));
        letter.style.opacity = opacity;
        letter.style.filter  = opacity < 1 ? `blur(${(1 - opacity) * 6}px)` : "none";
      });
    };

    const frameObj = { f: 0 };
    let anim = null;

    load(0).then((img) => {
      drawImg(img);

      anim = gsap.to(frameObj, {
        f: FRAME_COUNT - 1,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.8,
        },
        onUpdate() {
          draw(frameObj.f);
          updateLetters(frameObj.f / (FRAME_COUNT - 1));
        },
      });

      (async () => {
        for (let i = 1; i < FRAME_COUNT; i++) await load(i);
      })();
    });

    window.addEventListener("resize", resize);
    return () => {
      anim?.scrollTrigger?.kill();
      anim?.kill();
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <section ref={sectionRef} style={{ height: "400vh" }}>
      <div
        ref={stickyRef}
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          overflow: "hidden",
          backgroundColor: "#141414",
        }}
      >
        <canvas
          ref={canvasRef}
          style={{ display: "block", width: "100%", height: "100%" }}
        />

        {/* Untere Überblendung */}
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0,
          height: "22%",
          background: "linear-gradient(to bottom, transparent, #141414)",
          pointerEvents: "none",
          zIndex: 2,
        }} />

        {/* Text — steht auf der Wand, wird buchstabenweise von der Farbe bedeckt */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 5,
            pointerEvents: "none",
            textAlign: "center",
            animation: "wallTextIn 1.4s ease 0.3s both",
          }}
          aria-hidden="true"
        >
          {LINES.map((word, wi) => (
            <div
              key={word}
              style={{ display: "flex", justifyContent: "center", lineHeight: 1.05 }}
            >
              {word.split("").map((char, ci) => {
                const globalIdx = LINES.slice(0, wi).reduce((s, w) => s + w.length, 0) + ci;
                const v = LETTER_STYLE[globalIdx] || { r: 0, y: 0 };
                return (
                  <span
                    key={`${word}-${ci}`}
                    className="wall-letter"
                    style={{
                      display: "inline-block",
                      fontFamily: "'Neucha', cursive",
                      fontWeight: 400,
                      fontSize: "clamp(3.5rem, 8.5vw, 9rem)",
                      letterSpacing: "0.03em",
                      color: "rgba(255, 252, 240, 0.55)",
                      textTransform: "uppercase",
                      userSelect: "none",
                      willChange: "opacity, filter, transform",
                      mixBlendMode: "soft-light",
                      transform: `rotate(${v.r}deg) translateY(${v.y}px)`,
                    }}
                  >
                    {char}
                  </span>
                );
              })}
            </div>
          ))}

          {/* Pfeil */}
          <div style={{ marginTop: "1rem", display: "flex", justifyContent: "center" }}>
            <svg
              className="wall-letter wall-arrow"
              width="22" height="30" viewBox="0 0 22 30"
              fill="none" aria-hidden="true"
              style={{ willChange: "opacity, filter" }}
            >
              <path
                d="M11 2v24M3 20l8 8 8-8"
                stroke="rgba(255,252,240,0.45)"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>

        <style>{`
          @keyframes wallTextIn {
            from { opacity: 0; }
            to   { opacity: 1; }
          }
          @keyframes wallArrowBounce {
            0%, 100% { transform: translateY(0); }
            50%       { transform: translateY(7px); }
          }
          .wall-arrow { animation: wallArrowBounce 2s ease-in-out infinite; }
        `}</style>
      </div>
    </section>
  );
}
