"use client";
import { useRef, useEffect } from "react";
import { gsap, ScrollTrigger } from "../../../utils/gsap";

const FRAME_COUNT = 121;
const framePath = (n) =>
  `/images/frames/frame-${String(n).padStart(4, "0")}.jpg`;

export function VideoHero() {
  const sectionRef = useRef(null);
  const stickyRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const section = sectionRef.current;
    if (!canvas || !section) return;

    const ctx = canvas.getContext("2d");

    const images = new Array(FRAME_COUNT).fill(null);
    let lastImg = null;
    let lastIdx = -1;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      if (lastImg) drawImg(lastImg);
    };
    resize();

    const drawImg = (img) => {
      if (!img?.complete || img.naturalWidth === 0) return;
      lastImg = img;
      const sx = canvas.width / img.naturalWidth;
      const sy = canvas.height / img.naturalHeight;
      const s = Math.max(sx, sy);
      const w = img.naturalWidth * s;
      const h = img.naturalHeight * s;
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
        img.onload = () => { images[i] = img; res(img); };
        img.onerror = res;
        img.src = framePath(i + 1);
      });

    const frameObj = { f: 0 };
    let anim = null;

    load(0).then((img) => {
      drawImg(img);

      // No pin — section is 400vh with sticky inside.
      // ScrollTrigger scrubs from when section top hits viewport top
      // until section bottom hits viewport bottom (= 300vh of scrolling).
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
        },
      });

      // Load remaining frames sequentially in background
      (async () => {
        for (let i = 1; i < FRAME_COUNT; i++) {
          await load(i);
        }
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
    // 400vh outer section — provides the scroll distance
    <section ref={sectionRef} style={{ height: "400vh" }}>

      {/* 100vh sticky canvas — stays in view while parent scrolls */}
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
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "22%",
            background: "linear-gradient(to bottom, transparent, #141414)",
            pointerEvents: "none",
            zIndex: 2,
          }}
        />

        {/* Scroll-Hinweis */}
        <div
          style={{
            position: "absolute",
            bottom: 36,
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 8,
            color: "rgba(255,255,255,0.4)",
            pointerEvents: "none",
            zIndex: 10,
          }}
        >
          <span style={{
            fontFamily: "Syne, sans-serif",
            fontSize: "0.6rem",
            letterSpacing: "0.28em",
            textTransform: "uppercase",
          }}>
            Scroll
          </span>
          <div style={{ width: 1, height: 24, background: "rgba(255,255,255,0.2)" }} />
        </div>
      </div>
    </section>
  );
}
