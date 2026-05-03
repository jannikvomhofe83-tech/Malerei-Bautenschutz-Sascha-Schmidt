"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import { useScroll, useMotionValueEvent } from "framer-motion";
import { gsap, ScrollTrigger } from "../../../utils/gsap";

const FRAME_COUNT = 361;

// Each section: title + 3 bullets revealed one-by-one while scrolling
const SECTIONS = [
  {
    start: 0.00, end: 0.18,
    lines: ["Hochbau", "& Neubau"],
    eyebrow: "Leistung 01", number: "01",
    bullets: [
      "Massivbau, Stahlbeton und Fertigteilmontage",
      "Fundierte Planung mit transparenten Festpreisen",
      "Schlüsselfertige Übergabe aus einer Hand",
    ],
  },
  {
    start: 0.20, end: 0.38,
    lines: ["Erd- &", "Kanalbau"],
    eyebrow: "Leistung 02", number: "02",
    bullets: [
      "Millimetergenaue Erdbewegung und Geländemodellierung",
      "Kanal-, Leitungs- und Rohrbauarbeiten",
      "Sichere Fundamente und stabile Untergründe",
    ],
  },
  {
    start: 0.40, end: 0.58,
    lines: ["Sanierung", "& Umbau"],
    eyebrow: "Leistung 03", number: "03",
    bullets: [
      "Energetische Sanierung nach aktuellen Standards",
      "Denkmalgerechte Modernisierung mit Feingefühl",
      "Komplettumbau mit minimaler Beeinträchtigung",
    ],
  },
  {
    start: 0.60, end: 0.78,
    lines: ["Ingenieur-", "bau"],
    eyebrow: "Leistung 04", number: "04",
    bullets: [
      "Brücken, Stützmauern und Sonderkonstruktionen",
      "Komplexe Tragwerke nach statischen Anforderungen",
      "Enge Abstimmung mit Planern und Behörden",
    ],
  },
  {
    start: 0.80, end: 0.97,
    lines: ["Industrie- &", "Gewerbebau"],
    eyebrow: "Leistung 05", number: "05",
    bullets: [
      "Hallen, Lager und Produktionsstätten",
      "Funktionale Büro- und Gewerbeimmobilien",
      "Termin- und budgettreue Ausführung",
    ],
  },
];

// Thresholds within a section (0–1) at which each bullet appears
const BULLET_THRESHOLDS = [0.45, 0.68, 0.87];

export function VideoScrollSection() {
  const sectionRef = useRef(null);
  const canvasRef  = useRef(null);

  // ── Colleague's improved loader: fetch + createImageBitmap ────────────
  const bitmapsRef      = useRef(new Array(FRAME_COUNT).fill(null));
  const currentFrameRef = useRef(-1);
  const rafIdRef        = useRef(null);
  const [loadedCount, setLoadedCount] = useState(0);
  const [isReady, setIsReady]         = useState(false);

  // ── Title refs ────────────────────────────────────────────────────────
  const titleBlockRef  = useRef(null);
  const eyebrowRowRef  = useRef(null);
  const eyebrowLineRef = useRef(null);
  const eyebrowTextRef = useRef(null);
  const line1Ref       = useRef(null);
  const line2Ref       = useRef(null);
  const ghostNumberRef = useRef(null);

  // ── Bullet refs (3 bullet rows + their text spans) ────────────────────
  const bulletBlockRef = useRef(null);
  const bulletRefs     = useRef([null, null, null]);
  const bulletTextRefs = useRef([null, null, null]);

  // ── Progress bar ──────────────────────────────────────────────────────
  const progressBarRef = useRef(null);

  // ── Sticky container (for zoom-out transition) ────────────────────────
  const stickyRef = useRef(null);

  // ── Scroll-state tracking ─────────────────────────────────────────────
  const activeSectionRef    = useRef(-1);
  const activeBulletsRef    = useRef(0);   // how many bullets currently shown
  const prevScrollRef       = useRef(0);
  const activeTitleDirRef   = useRef(-1);  // -1 = from left, 1 = from right
  const charsRef            = useRef({ line1: [], line2: [] }); // current char spans
  const snappingRef         = useRef(false); // lock during auto-snap to top

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // ── Canvas draw ───────────────────────────────────────────────────────
  const drawFrame = useCallback((frameIndex) => {
    if (frameIndex === currentFrameRef.current) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const bitmap = bitmapsRef.current[frameIndex];
    if (!bitmap) return;
    currentFrameRef.current = frameIndex;

    const dpr = window.devicePixelRatio || 1;
    const w = canvas.clientWidth * dpr;
    const h = canvas.clientHeight * dpr;
    if (canvas.width !== w || canvas.height !== h) { canvas.width = w; canvas.height = h; }
    const ctx = canvas.getContext("2d", { alpha: false });
    const ca = w / h, ba = bitmap.width / bitmap.height;
    let rw, rh, x, y;
    if (ca > ba) { rw = w; rh = w / ba; x = 0; y = (h - rh) / 2; }
    else { rh = h; rw = h * ba; y = 0; x = (w - rw) / 2; }
    ctx.drawImage(bitmap, x, y, rw, rh);
  }, []);

  // ── Batch loading ─────────────────────────────────────────────────────
  useEffect(() => {
    let loaded = 0;
    const bitmaps = bitmapsRef.current;
    const BATCH = 25;
    const loadFrame = (i) =>
      fetch(`/images/video3-sequence/frame_${String(i).padStart(4, "0")}.jpg`)
        .then(r => r.blob()).then(blob => createImageBitmap(blob))
        .then(bitmap => {
          bitmaps[i - 1] = bitmap;
          loaded++;
          setLoadedCount(loaded);
          if (loaded === 1) drawFrame(0);
          if (loaded === FRAME_COUNT) setIsReady(true);
        });
    const loadAll = async () => {
      for (let start = 1; start <= FRAME_COUNT; start += BATCH) {
        const end = Math.min(start + BATCH - 1, FRAME_COUNT);
        await Promise.all(Array.from({ length: end - start + 1 }, (_, k) => loadFrame(start + k)));
      }
    };
    loadAll();
  }, [drawFrame]);

  // ── Helper: split element text into individual inline-block char spans ──
  const makeCharSpans = (el, text) => {
    el.innerHTML = "";
    return text.split("").map(char => {
      const s = document.createElement("span");
      s.style.display = "inline-block";
      s.textContent = char === " " ? " " : char;
      el.appendChild(s);
      return s;
    });
  };

  // ── GSAP: title enter/exit ────────────────────────────────────────────
  const enterTitle = (section) => {
    if (ghostNumberRef.current) ghostNumberRef.current.textContent = section.number;
    if (eyebrowTextRef.current) eyebrowTextRef.current.textContent = section.eyebrow;

    // Kill tweens on previous char spans + containers before replacing
    gsap.killTweensOf([
      ...charsRef.current.line1, ...charsRef.current.line2,
      line1Ref.current, line2Ref.current,
      eyebrowLineRef.current, eyebrowTextRef.current, ghostNumberRef.current,
    ]);

    // Split lines into char spans for typewriter animation
    const chars1 = line1Ref.current ? makeCharSpans(line1Ref.current, section.lines[0]) : [];
    const chars2 = line2Ref.current ? makeCharSpans(line2Ref.current, section.lines[1]) : [];
    charsRef.current = { line1: chars1, line2: chars2 };

    const idx = SECTIONS.indexOf(section);
    const dir = idx % 2 === 0 ? -1 : 1;
    activeTitleDirRef.current = dir;
    const fromRight = dir === 1;

    // Position title block
    if (titleBlockRef.current) {
      titleBlockRef.current.style.left      = fromRight ? "auto" : "5%";
      titleBlockRef.current.style.right     = fromRight ? "5%"   : "auto";
      titleBlockRef.current.style.textAlign = fromRight ? "right" : "left";
    }
    if (eyebrowRowRef.current) {
      eyebrowRowRef.current.style.flexDirection = fromRight ? "row-reverse" : "row";
    }
    if (ghostNumberRef.current) {
      ghostNumberRef.current.style.left  = fromRight ? "3%"  : "auto";
      ghostNumberRef.current.style.right = fromRight ? "auto" : "3%";
    }

    // Position bullet block on the opposite side
    if (bulletBlockRef.current) {
      bulletBlockRef.current.style.left      = fromRight ? "5%"   : "auto";
      bulletBlockRef.current.style.right     = fromRight ? "auto" : "5%";
      bulletBlockRef.current.style.textAlign = fromRight ? "left"  : "right";
    }

    // Set bullet texts
    section.bullets.forEach((text, i) => {
      if (bulletTextRefs.current[i]) bulletTextRefs.current[i].textContent = text;
    });

    // Reset bullets to hidden
    gsap.set(bulletRefs.current, { opacity: 0, x: fromRight ? -40 : 40 });
    activeBulletsRef.current = 0;

    const extraDelay = (section.number === "02" || section.number === "05") ? 0.4 : 0;

    // Chars fly in from the actual screen edge
    const xStart = fromRight ? window.innerWidth * 0.75 : -window.innerWidth * 0.75;
    gsap.set([...chars1, ...chars2], { x: xStart, opacity: 0 });
    // Container divs must be fully visible — only char spans carry the transform
    gsap.set([line1Ref.current, line2Ref.current], { x: 0, opacity: 1 });

    gsap.set(eyebrowLineRef.current, { scaleX: 0 });
    gsap.set(eyebrowTextRef.current, { opacity: 0, x: dir * -28 });
    gsap.set(ghostNumberRef.current, { opacity: 0, x: dir * 55 });

    gsap.timeline({ delay: extraDelay })
      .to(eyebrowLineRef.current, { scaleX: 1, duration: 0.42, ease: "power3.inOut" }, 0)
      .to(eyebrowTextRef.current, { opacity: 1, x: 0, duration: 0.45, ease: "power3.out" }, 0.12)
      .to(chars1, { x: 0, opacity: 1, duration: 0.55, stagger: { amount: 0.45, from: fromRight ? "end" : "start" }, ease: "power3.out" }, 0.18)
      .to(chars2, { x: 0, opacity: 1, duration: 0.55, stagger: { amount: 0.45, from: fromRight ? "end" : "start" }, ease: "power3.out" }, 0.32)
      .to(ghostNumberRef.current, { opacity: 0.12, x: 0, duration: 0.95, ease: "power2.out" }, 0.08);
  };

  const exitTitle = () => {
    const xOut = activeTitleDirRef.current * -80;
    gsap.killTweensOf([
      ...charsRef.current.line1, ...charsRef.current.line2,
      line1Ref.current, line2Ref.current,
      eyebrowLineRef.current, eyebrowTextRef.current, ghostNumberRef.current,
      ...bulletRefs.current,
    ]);
    gsap.timeline()
      .to([line1Ref.current, line2Ref.current], { x: xOut, opacity: 0, duration: 0.36, ease: "power2.in", stagger: 0.05 }, 0)
      .to(eyebrowTextRef.current,               { opacity: 0, x: xOut * 0.5, duration: 0.25 },                             0)
      .to(eyebrowLineRef.current,               { scaleX: 0, duration: 0.28, ease: "power2.in" },                          0.04)
      .to(ghostNumberRef.current,               { opacity: 0, duration: 0.22 },                                            0)
      .to(bulletRefs.current,                   { opacity: 0, x: xOut * 0.5, duration: 0.28, stagger: 0.04 },              0);
    activeBulletsRef.current = 0;
  };

  // ── GSAP: show / hide individual bullets ─────────────────────────────
  const showBullet = (idx) => {
    const el = bulletRefs.current[idx];
    if (!el) return;
    const fromRight = activeTitleDirRef.current === 1;
    gsap.killTweensOf(el);
    gsap.fromTo(el,
      { opacity: 0, x: fromRight ? -45 : 45 },
      { opacity: 1, x: 0, duration: 0.55, ease: "power3.out" }
    );
  };

  const hideBullet = (idx) => {
    const el = bulletRefs.current[idx];
    if (!el) return;
    gsap.killTweensOf(el);
    gsap.to(el, { opacity: 0, duration: 0.25, ease: "power2.in" });
  };

  // ── Scroll driver ─────────────────────────────────────────────────────
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    prevScrollRef.current = latest;

    // Canvas frame
    if (isReady) {
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
      rafIdRef.current = requestAnimationFrame(() =>
        drawFrame(Math.floor(Math.max(0, Math.min(0.9999, latest)) * FRAME_COUNT))
      );
    }

    // Progress bar
    if (progressBarRef.current) {
      progressBarRef.current.style.transform = `scaleX(${latest})`;
    }

    // Section state machine
    const newSectionIdx = SECTIONS.findIndex(s => latest >= s.start && latest < s.end);
    if (newSectionIdx !== activeSectionRef.current) {
      if (activeSectionRef.current >= 0) exitTitle();
      activeSectionRef.current = newSectionIdx;
      if (newSectionIdx >= 0) enterTitle(SECTIONS[newSectionIdx]);
    }

    // Bullet reveal — one by one based on progress within current section
    if (activeSectionRef.current >= 0) {
      const section = SECTIONS[activeSectionRef.current];
      const dur = section.end - section.start;
      const sectionProgress = (latest - section.start) / dur;

      const bulletsToShow = BULLET_THRESHOLDS.filter(t => sectionProgress >= t).length;

      if (bulletsToShow > activeBulletsRef.current) {
        // Show newly visible bullets
        for (let i = activeBulletsRef.current; i < bulletsToShow; i++) showBullet(i);
        activeBulletsRef.current = bulletsToShow;
      } else if (bulletsToShow < activeBulletsRef.current) {
        // Hide bullets when scrolling back
        for (let i = bulletsToShow; i < activeBulletsRef.current; i++) hideBullet(i);
        activeBulletsRef.current = bulletsToShow;
      }
    }
  });

  // ── Camera-style transition between this section and the next ────────
  useEffect(() => {
    const section = sectionRef.current;
    const sticky  = stickyRef.current;
    if (!section || !sticky) return;

    const nextEl = section.nextElementSibling;
    if (!nextEl) return;

    sticky.style.transformOrigin   = "center center";
    sticky.style.willChange        = "transform, border-radius";
    nextEl.style.transformOrigin   = "center top";
    nextEl.style.willChange        = "transform, opacity";

    // Phase 1 — pinned sticky pulls back during the last ~6% of the
    // video section's scrollable range. Looks like the camera dollies out.
    const stickyTrigger = ScrollTrigger.create({
      trigger: section,
      start:  () => `top+=${(section.offsetHeight - window.innerHeight) * 0.94} top`,
      end:    () => `top+=${ section.offsetHeight - window.innerHeight}        top`,
      scrub: 0.6,
      onUpdate: (self) => {
        const t = self.progress;                  // 0 → 1
        const scale  = 1 - t * 0.18;              // 1.00 → 0.82
        const radius = t * 28;                    // 0  → 28px
        const opac   = 1 - t * 0.12;              // 1.00 → 0.88
        sticky.style.transform    = `scale(${scale})`;
        sticky.style.borderRadius = `${radius}px`;
        sticky.style.opacity      = String(opac);
      },
    });

    // Phase 2 — picks up where Phase 1 leaves off: the next section
    // appears oversized (camera "punches into" it) and settles to 1×
    // as the user scrolls it into place. Same easing direction as
    // Phase 1, so the two read as one continuous camera move.
    const nextTrigger = ScrollTrigger.create({
      trigger: nextEl,
      start: "top bottom",   // first peek over the fold
      end:   "top top",      // settled by the time it reaches the top
      scrub: 0.6,
      onUpdate: (self) => {
        const t = self.progress;                  // 0 → 1
        const eased = 1 - Math.pow(1 - t, 3);     // ease-out cubic — punches in fast, settles
        const scale = 2.6 - eased * 1.6;          // 2.60 → 1.00
        const ty    = (1 - eased) * -180;         // -180 → 0
        const opac  = 0.05 + eased * 0.95;        // 0.05 → 1.00
        nextEl.style.transform = `scale(${scale}) translateY(${ty}px)`;
        nextEl.style.opacity   = String(opac);
      },
    });

    ScrollTrigger.refresh();

    return () => {
      stickyTrigger.kill();
      nextTrigger.kill();
      sticky.style.transform    = "";
      sticky.style.borderRadius = "";
      sticky.style.opacity      = "";
      nextEl.style.transform    = "";
      nextEl.style.opacity      = "";
    };
  }, []);

  // ── Snap to section top when re-entering from below ──────────────────
  useEffect(() => {
    let wasAtEnd = false;
    let sectionTopCache = 0;

    const cacheTop = () => {
      if (sectionRef.current) {
        sectionTopCache = sectionRef.current.getBoundingClientRect().top + window.scrollY;
      }
    };
    cacheTop();

    const onScroll = () => {
      if (snappingRef.current) return;
      const section = sectionRef.current;
      if (!section) return;
      const scrollY = window.scrollY;
      const sectionEnd = sectionTopCache + section.offsetHeight - window.innerHeight;

      if (scrollY >= sectionEnd - 30) {
        wasAtEnd = true;
      } else if (wasAtEnd && scrollY > sectionTopCache && scrollY < sectionEnd) {
        // Re-entering from below — jump to section start
        wasAtEnd = false;
        snappingRef.current = true;
        window.scrollTo({ top: sectionTopCache, behavior: 'instant' });
        setTimeout(() => { snappingRef.current = false; }, 400);
      } else if (scrollY <= sectionTopCache) {
        wasAtEnd = false;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', cacheTop);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', cacheTop);
    };
  }, []);

  // ── Init + resize ─────────────────────────────────────────────────────
  useEffect(() => {
    // Line containers stay visible; char spans handle their own opacity/position
    gsap.set([line1Ref.current, line2Ref.current], { x: 0, opacity: 1 });
    gsap.set(eyebrowLineRef.current, { scaleX: 0, transformOrigin: "left center" });
    gsap.set([eyebrowTextRef.current, ghostNumberRef.current], { opacity: 0 });
    gsap.set(bulletRefs.current, { opacity: 0 });

    const handleResize = () => {
      if (!canvasRef.current) return;
      currentFrameRef.current = -1;
      drawFrame(Math.floor(Math.max(0, Math.min(0.9999, scrollYProgress.get())) * FRAME_COUNT));
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    };
  }, [scrollYProgress, drawFrame]);

  return (
    <section ref={sectionRef} className="relative w-full bg-[#f0f0ef]" style={{ height: "1100vh" }}>
      <div ref={stickyRef} className="sticky top-0 h-screen w-full overflow-hidden" style={{ transformOrigin: "center center" }}>

        {/* Canvas */}
        <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />

        {/* Atmospheric gradient */}
        <div className="pointer-events-none absolute inset-0 z-10"
          style={{ background: "linear-gradient(to top, rgba(4,13,28,0.65) 0%, rgba(4,13,28,0.08) 50%, rgba(4,13,28,0.2) 100%)" }}
        />

        {/* Vignette */}
        <div className="pointer-events-none absolute inset-0 z-10"
          style={{ background: "radial-gradient(circle at center, transparent 30%, rgba(0,0,0,0.45) 100%)" }}
        />

        {/* Ghost number */}
        <div
          ref={ghostNumberRef}
          className="pointer-events-none absolute bottom-[6%] right-[3%] font-heading font-bold leading-none text-white select-none z-20"
          style={{ fontSize: "clamp(6rem, 14vw, 18rem)", letterSpacing: "-0.04em", opacity: 0 }}
          aria-hidden="true"
        />

        {/* ── Title block — repositions left/right ── */}
        <div ref={titleBlockRef} className="pointer-events-none absolute bottom-[11%] z-30" style={{ left: "5%" }}>
          <div ref={eyebrowRowRef} className="mb-5 flex items-center gap-4">
            <span ref={eyebrowLineRef} className="block h-px bg-hoser-gold" style={{ width: "2.2rem" }} />
            <span ref={eyebrowTextRef} className="font-body text-xs font-semibold uppercase tracking-[0.32em] text-hoser-gold" />
          </div>
          <div
            ref={line1Ref}
            className="font-heading font-bold leading-[0.9] tracking-tight text-white"
            style={{ fontSize: "clamp(4rem, 9vw, 10.5rem)", textShadow: "0 4px 60px rgba(0,0,0,0.98), 0 2px 16px rgba(0,0,0,0.9)", paddingBottom: "0.04em" }}
          />
          <div
            ref={line2Ref}
            className="font-heading font-bold leading-[0.9] tracking-tight text-white"
            style={{ fontSize: "clamp(4rem, 9vw, 10.5rem)", textShadow: "0 4px 60px rgba(0,0,0,0.98), 0 2px 16px rgba(0,0,0,0.9)", paddingBottom: "0.04em" }}
          />
        </div>

        {/* ── Bullet block — opposite side of title ── */}
        <div
          ref={bulletBlockRef}
          className="pointer-events-none absolute top-[38%] z-30 max-w-[340px] -translate-y-1/2 space-y-14"
          style={{ right: "5%" }}
        >
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              ref={el => bulletRefs.current[i] = el}
              className="flex items-start gap-3"
            >
              <span
                className="mt-[0.6em] block h-px w-5 flex-shrink-0 bg-hoser-gold/70"
              />
              <p
                ref={el => bulletTextRefs.current[i] = el}
                className="font-body text-base leading-relaxed text-white/85 md:text-lg"
                style={{ textShadow: "0 2px 20px rgba(0,0,0,0.95), 0 1px 6px rgba(0,0,0,0.85)" }}
              />
            </div>
          ))}
        </div>

        {/* Progress bar */}
        <div className="pointer-events-none absolute bottom-0 left-0 z-40 h-[2px] w-full bg-white/8">
          <div
            ref={progressBarRef}
            className="h-full bg-hoser-gold"
            style={{ transformOrigin: "left center", transform: "scaleX(0)" }}
          />
        </div>

        {/* Grain */}
        <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.08] mix-blend-overlay z-20" xmlns="http://www.w3.org/2000/svg">
          <filter id="vss-grain">
            <feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves="3" stitchTiles="stitch" />
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#vss-grain)" />
        </svg>

        {/* Loading screen */}
        {!isReady && (
          <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-[#040D1C]">
            <p className="mb-4 font-body text-xs uppercase tracking-[0.3em] text-white/40">Wird geladen</p>
            <div className="h-px w-48 bg-white/10">
              <div
                className="h-full bg-hoser-gold transition-all duration-300"
                style={{ width: `${Math.round((loadedCount / FRAME_COUNT) * 100)}%` }}
              />
            </div>
            <p className="mt-3 font-body text-xs text-white/25">{Math.round((loadedCount / FRAME_COUNT) * 100)}%</p>
          </div>
        )}

      </div>
    </section>
  );
}
