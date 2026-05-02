"use client";

import React, { useRef, useEffect, useState } from "react";
import { useScroll, useMotionValueEvent } from "framer-motion";
import { gsap } from "../../../utils/gsap";

const FRAME_COUNT = 227;

const TITLE_EVENTS = [
  { start: 0.00, end: 0.02, lines: ["Unsere", "Leistungen"],    eyebrow: "Hoser Bauunternehmen", number: null },
  { start: 0.03, end: 0.19, lines: ["Hochbau",   "& Neubau"],   eyebrow: "Leistung 01",          number: "01" },
  { start: 0.20, end: 0.39, lines: ["Erdbau",    "& Kanalbau"], eyebrow: "Leistung 02",          number: "02" },
  { start: 0.40, end: 0.59, lines: ["Sanierung", "& Umbau"],    eyebrow: "Leistung 03",          number: "03" },
  { start: 0.60, end: 0.79, lines: ["Ingenieur-","bau"],         eyebrow: "Leistung 04",          number: "04" },
  { start: 0.80, end: 0.99, lines: ["Industrie- &","Gewerbebau"],eyebrow: "Leistung 05",          number: "05" },
];

const SUBTITLE_EVENTS = [
  { start: 0.00, end: 0.02, text: "Das gesamte Spektrum des Bauens – von der Skizze bis zur schlüsselfertigen Übergabe." },
  { start: 0.04, end: 0.10, text: "Fundierte Planung und massive Bauweise." },
  { start: 0.10, end: 0.16, text: "Dein Projekt, Stein für Stein verwirklicht." },
  { start: 0.22, end: 0.29, text: "Millimetergenaue Präzision tief im Erdreich." },
  { start: 0.30, end: 0.37, text: "Sichere Netze und ein stabiles Fundament." },
  { start: 0.42, end: 0.49, text: "Neues Leben für bestehende Strukturen." },
  { start: 0.50, end: 0.57, text: "Energieeffizient und modernisiert für die Zukunft." },
  { start: 0.62, end: 0.69, text: "Komplexe Konstruktionen sicher gemeistert." },
  { start: 0.70, end: 0.77, text: "Tragwerke für höchste Anforderungen." },
  { start: 0.82, end: 0.89, text: "Funktionale Architektur und große Hallen." },
  { start: 0.90, end: 0.97, text: "Gebaut für deinen wirtschaftlichen Erfolg." },
];

export function VideoScrollSection() {
  const sectionRef    = useRef(null);
  const canvasRef     = useRef(null);
  const imagesRef     = useRef([]);
  const [imagesLoaded, setImagesLoaded] = useState(0);

  // ── Text element refs ────────────────────────────────────────────────
  const line1Ref        = useRef(null);
  const line2Ref        = useRef(null);
  const eyebrowLineRef  = useRef(null);
  const eyebrowTextRef  = useRef(null);
  const ghostNumberRef  = useRef(null);
  const subtitleRef     = useRef(null);
  const progressBarRef  = useRef(null);

  // ── Scroll-state tracking ────────────────────────────────────────────
  const activeTitleRef    = useRef(-1);
  const activeSubtitleRef = useRef(-1);
  const prevScrollRef     = useRef(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // ── Image loading ────────────────────────────────────────────────────
  useEffect(() => {
    let loadedCount = 0;
    const images = [];
    for (let i = 1; i <= FRAME_COUNT; i++) {
      const img = new Image();
      img.src = `/images/video3-sequence/frame_${i.toString().padStart(4, "0")}.jpg`;
      img.onload = () => {
        loadedCount++;
        setImagesLoaded(loadedCount);
        if (loadedCount === 1) drawFrame(0);
      };
      images.push(img);
    }
    imagesRef.current = images;
  }, []);

  const currentFrameRef = useRef(-1);
  const rafIdRef        = useRef(null);

  const drawFrame = (frameIndex) => {
    if (frameIndex === currentFrameRef.current) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    const img = imagesRef.current[frameIndex];
    if (!img?.complete) return;

    currentFrameRef.current = frameIndex;
    const dpr = window.devicePixelRatio || 1;
    const pw = canvas.clientWidth * dpr;
    const ph = canvas.clientHeight * dpr;
    if (canvas.width !== pw || canvas.height !== ph) {
      canvas.width = pw;
      canvas.height = ph;
    }
    const ca = canvas.width / canvas.height;
    const ia = img.width / img.height;
    let rw, rh, x, y;
    if (ca > ia) { rw = canvas.width; rh = rw / ia; x = 0; y = (canvas.height - rh) / 2; }
    else { rh = canvas.height; rw = rh * ia; y = 0; x = (canvas.width - rw) / 2; }
    ctx.imageSmoothingEnabled = true;
    ctx.drawImage(img, x, y, rw, rh);
  };

  // ── GSAP animation helpers ───────────────────────────────────────────
  const enterTitle = (event) => {
    if (ghostNumberRef.current)  ghostNumberRef.current.textContent  = event.number || "";
    if (eyebrowTextRef.current)  eyebrowTextRef.current.textContent  = event.eyebrow;
    if (line1Ref.current)        line1Ref.current.textContent        = event.lines[0] || "";
    if (line2Ref.current)        line2Ref.current.textContent        = event.lines[1] || "";

    const targets = [line1Ref.current, line2Ref.current, eyebrowLineRef.current, eyebrowTextRef.current, ghostNumberRef.current];
    gsap.killTweensOf(targets);

    gsap.set([line1Ref.current, line2Ref.current], { y: "115%" });
    gsap.set(eyebrowLineRef.current, { scaleX: 0 });
    gsap.set(eyebrowTextRef.current, { opacity: 0, y: 8 });
    gsap.set(ghostNumberRef.current, { opacity: 0, y: 30 });

    gsap.timeline()
      .to(eyebrowLineRef.current,  { scaleX: 1, duration: 0.45, ease: "power3.inOut" },       0)
      .to(eyebrowTextRef.current,  { opacity: 1, y: 0, duration: 0.4, ease: "power3.out" },   0.15)
      .to(line1Ref.current,        { y: "0%", duration: 0.7, ease: "power3.out" },             0.2)
      .to(line2Ref.current,        { y: "0%", duration: 0.7, ease: "power3.out" },             0.32)
      .to(ghostNumberRef.current,  { opacity: event.number ? 0.07 : 0, y: 0, duration: 1.0, ease: "power2.out" }, 0.1);
  };

  const exitTitle = (scrollingDown) => {
    const yDir = scrollingDown ? "-115%" : "115%";
    gsap.killTweensOf([line1Ref.current, line2Ref.current, eyebrowLineRef.current, eyebrowTextRef.current, ghostNumberRef.current]);

    gsap.timeline()
      .to([line2Ref.current, line1Ref.current], { y: yDir, duration: 0.38, ease: "power2.in", stagger: 0.06 }, 0)
      .to(eyebrowTextRef.current,               { opacity: 0, y: -5, duration: 0.25 },                         0)
      .to(eyebrowLineRef.current,               { scaleX: 0, duration: 0.28, ease: "power2.in" },              0.05)
      .to(ghostNumberRef.current,               { opacity: 0, duration: 0.22 },                                0);
  };

  const enterSubtitle = (event) => {
    if (!subtitleRef.current) return;
    subtitleRef.current.textContent = event.text;
    gsap.killTweensOf(subtitleRef.current);
    gsap.fromTo(subtitleRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.65, ease: "power3.out" }
    );
  };

  const exitSubtitle = () => {
    if (!subtitleRef.current) return;
    gsap.killTweensOf(subtitleRef.current);
    gsap.to(subtitleRef.current, { opacity: 0, y: -14, duration: 0.32, ease: "power2.in" });
  };

  // ── Scroll driver ────────────────────────────────────────────────────
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const scrollingDown = latest > prevScrollRef.current;
    prevScrollRef.current = latest;

    // Canvas frame
    const frameIndex = Math.min(FRAME_COUNT - 1, Math.max(0, Math.floor(latest * FRAME_COUNT)));
    if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    rafIdRef.current = requestAnimationFrame(() => drawFrame(frameIndex));

    // Progress bar
    if (progressBarRef.current) {
      progressBarRef.current.style.transform = `scaleX(${latest})`;
    }

    // Title state machine
    const newTitleIdx = TITLE_EVENTS.findIndex(e => latest >= e.start && latest < e.end);
    if (newTitleIdx !== activeTitleRef.current) {
      if (activeTitleRef.current >= 0) exitTitle(scrollingDown);
      activeTitleRef.current = newTitleIdx;
      if (newTitleIdx >= 0) enterTitle(TITLE_EVENTS[newTitleIdx]);
    }

    // Subtitle state machine
    const newSubIdx = SUBTITLE_EVENTS.findIndex(e => latest >= e.start && latest < e.end);
    if (newSubIdx !== activeSubtitleRef.current) {
      if (activeSubtitleRef.current >= 0) exitSubtitle();
      activeSubtitleRef.current = newSubIdx;
      if (newSubIdx >= 0) enterSubtitle(SUBTITLE_EVENTS[newSubIdx]);
    }
  });

  // ── Init + resize ────────────────────────────────────────────────────
  useEffect(() => {
    gsap.set([line1Ref.current, line2Ref.current], { y: "115%" });
    gsap.set(eyebrowLineRef.current, { scaleX: 0, transformOrigin: "left center" });
    gsap.set([eyebrowTextRef.current, ghostNumberRef.current, subtitleRef.current], { opacity: 0 });

    const handleResize = () => {
      if (!canvasRef.current) return;
      currentFrameRef.current = -1;
      const idx = Math.min(FRAME_COUNT - 1, Math.max(0, Math.floor(scrollYProgress.get() * FRAME_COUNT)));
      drawFrame(idx);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    };
  }, [scrollYProgress]);

  return (
    <section ref={sectionRef} className="relative w-full bg-[#040D1C]" style={{ height: "1500vh" }}>
      <div className="sticky top-0 h-screen w-full overflow-hidden">

        {/* Canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 h-full w-full"
          style={{ willChange: "transform" }}
        />

        {/* Atmospheric gradient — deepens bottom for text legibility */}
        <div
          className="pointer-events-none absolute inset-0 z-10"
          style={{
            background:
              "linear-gradient(to top, rgba(4,13,28,0.65) 0%, rgba(4,13,28,0.1) 45%, rgba(4,13,28,0.2) 100%)",
          }}
        />

        {/* Ghost section number — dramatic typographic backdrop */}
        <div
          ref={ghostNumberRef}
          className="pointer-events-none absolute bottom-[6%] right-[3%] font-heading font-bold leading-none text-white select-none z-20"
          style={{
            fontSize: "clamp(10rem, 24vw, 28rem)",
            letterSpacing: "-0.04em",
            opacity: 0,
          }}
          aria-hidden="true"
        />

        {/* ── Title block — bottom left ── */}
        <div className="pointer-events-none absolute bottom-[11%] left-[5%] md:left-[7%] z-30">

          {/* Eyebrow: gold line + category label */}
          <div className="mb-5 flex items-center gap-4">
            <span
              ref={eyebrowLineRef}
              className="block h-px bg-hoser-gold"
              style={{ width: "2.2rem" }}
            />
            <span
              ref={eyebrowTextRef}
              className="font-body text-xs font-semibold uppercase tracking-[0.32em] text-hoser-gold"
            />
          </div>

          {/* Line 1 — mask reveal */}
          <div style={{ overflow: "hidden", paddingBottom: "0.04em" }}>
            <div
              ref={line1Ref}
              className="font-heading font-bold leading-[0.9] tracking-tight text-white"
              style={{
                fontSize: "clamp(4rem, 9vw, 10.5rem)",
                textShadow: "0 4px 60px rgba(0,0,0,0.98), 0 2px 16px rgba(0,0,0,0.9)",
              }}
            />
          </div>

          {/* Line 2 — mask reveal */}
          <div style={{ overflow: "hidden", paddingBottom: "0.04em" }}>
            <div
              ref={line2Ref}
              className="font-heading font-bold leading-[0.9] tracking-tight text-white"
              style={{
                fontSize: "clamp(4rem, 9vw, 10.5rem)",
                textShadow: "0 4px 60px rgba(0,0,0,0.98), 0 2px 16px rgba(0,0,0,0.9)",
              }}
            />
          </div>
        </div>

        {/* ── Subtitle — top right ── */}
        <div className="pointer-events-none absolute top-[9%] right-[5%] md:right-[7%] z-30 max-w-[360px] text-right">
          <p
            ref={subtitleRef}
            className="font-body text-xl leading-relaxed text-white/90 md:text-2xl"
            style={{
              textShadow: "0 2px 28px rgba(0,0,0,0.98), 0 1px 8px rgba(0,0,0,0.9)",
            }}
          />
        </div>

        {/* ── Progress bar ── */}
        <div className="pointer-events-none absolute bottom-0 left-0 z-40 h-[2px] w-full bg-white/8">
          <div
            ref={progressBarRef}
            className="h-full bg-hoser-gold"
            style={{ transformOrigin: "left center", transform: "scaleX(0)" }}
          />
        </div>

        {/* Cinematic grain overlay */}
        <svg
          className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.09] mix-blend-overlay z-20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <filter id="vss-grain">
            <feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves="3" stitchTiles="stitch" />
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#vss-grain)" />
        </svg>

        {/* Loading indicator */}
        {imagesLoaded < FRAME_COUNT && (
          <div className="absolute top-4 left-4 z-50 font-body text-xs uppercase tracking-widest text-white/50">
            Lade HD-Video... {Math.round((imagesLoaded / FRAME_COUNT) * 100)}%
          </div>
        )}

      </div>
    </section>
  );
}
