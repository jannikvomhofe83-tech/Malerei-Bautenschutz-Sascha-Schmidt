"use client";

import { useRef, useEffect } from "react";
import { gsap, ScrollTrigger } from "../../../utils/gsap";

export function Header78() {
  const sectionRef = useRef(null);
  const imageRef   = useRef(null);
  const cursorRef  = useRef(null);

  // Cursor follow + clip-path reveal + wall-text erase effect
  useEffect(() => {
    const section  = sectionRef.current;
    const cursorEl = cursorRef.current;
    const imageEl  = imageRef.current;
    if (!section || !cursorEl || !imageEl) return;

    let targetX = 0;
    let targetY = 0;
    let smoothX = 0;
    let smoothY = 0;
    let active  = false;

    const RADIUS = 180;

    const onMove = (e) => {
      const rect = section.getBoundingClientRect();
      targetX = e.clientX - rect.left;
      targetY = e.clientY - rect.top;
      if (!active) {
        active  = true;
        smoothX = targetX;
        smoothY = targetY;
        cursorEl.style.opacity = "1";
      }
    };

    const onLeave = () => {
      active = false;
      cursorEl.style.opacity = "0";
      imageEl.style.clipPath = "circle(0px at 50% 50%)";
    };

    const tick = () => {
      if (!active) return;
      smoothX += (targetX - smoothX) * 0.22;
      smoothY += (targetY - smoothY) * 0.22;
      cursorEl.style.transform = `translate3d(${smoothX}px, ${smoothY}px, 0) translate(-50%, -50%)`;
      imageEl.style.clipPath = `circle(${RADIUS}px at ${smoothX}px ${smoothY}px)`;
    };

    cursorEl.style.opacity = "0";
    imageEl.style.clipPath  = "circle(0px at 50% 50%)";

    section.addEventListener("mousemove", onMove);
    section.addEventListener("mouseleave", onLeave);
    gsap.ticker.add(tick);

    return () => {
      section.removeEventListener("mousemove", onMove);
      section.removeEventListener("mouseleave", onLeave);
      gsap.ticker.remove(tick);
      active = false;
      cursorEl.style.opacity = "0";
      imageEl.style.clipPath  = "circle(0px at 50% 50%)";
    };
  }, []);

  // Hero reveal animations
  useEffect(() => {
    const scope = sectionRef.current;
    if (!scope) return;

    const ctx = gsap.context(() => {
      gsap.to(".hero-bg-img", {
        yPercent: -12,
        ease: "none",
        scrollTrigger: {
          trigger: scope,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: scope,
          start: "top 85%",
          toggleActions: "play none none none",
        },
        defaults: { ease: "power3.out" },
      });

      tl.fromTo(scope.querySelector(".hero-bg-img"),
        { scale: 1.08 }, { scale: 1, duration: 2.5, ease: "power1.out" }, 0);
      tl.fromTo(scope.querySelector(".hero-eyebrow-line"),
        { scaleX: 0 }, { scaleX: 1, transformOrigin: "left center", duration: 0.85 }, 0.2);
      tl.fromTo(scope.querySelector(".hero-eyebrow-inner"),
        { y: "120%" }, { y: "0%", duration: 0.65 }, 0.5);
      tl.fromTo(scope.querySelectorAll(".hero-headline-inner"),
        { y: "110%" }, { y: "0%", stagger: 0.13, duration: 1.1 }, 0.7);
      tl.fromTo(scope.querySelector(".hero-body"),
        { y: 28, opacity: 0 }, { y: 0, opacity: 1, duration: 0.85 }, 1.2);
      tl.fromTo(scope.querySelectorAll(".hero-cta"),
        { y: 22, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.11, duration: 0.7 }, 1.5);
    }, scope);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hero-section"
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{ height: "calc(100vh - 4.5rem)", cursor: "none" }}
    >
      {/* Bild Nachher — vollflächiger Hintergrund */}
      <img
        src="/images/hero-nachher.png"
        alt="Fertig gestaltete Wand"
        className="hero-bg-img absolute inset-0 h-full w-full object-cover object-center"
        style={{ willChange: "transform", filter: "saturate(0.92) brightness(1.04)" }}
      />

      {/* Dunkler Verlauf — links dicht, rechts ausblendend */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to right, rgba(20,20,20,0.93) 0%, rgba(20,20,20,0.80) 38%, rgba(20,20,20,0.45) 65%, rgba(20,20,20,0.12) 100%)",
        }}
      />

      {/* Bild Vorher — Pinsel-Reveal via clip-path */}
      <img
        ref={imageRef}
        src="/images/hero-vorher.png"
        alt="Wand vor der Behandlung"
        className="absolute inset-0 h-full w-full object-cover object-center"
        style={{ clipPath: "circle(0px at 50% 50%)", willChange: "clip-path" }}
      />

      {/* Custom Cursor: outer ring + inner dot */}
      <div
        ref={cursorRef}
        className="pointer-events-none absolute left-0 top-0 z-20 flex items-center justify-center"
        style={{
          width: 48, height: 48,
          opacity: 0,
          transition: "opacity 0.25s ease",
          willChange: "transform",
        }}
        aria-hidden="true"
      >
        <span className="absolute inset-0 rounded-full border" style={{ borderColor: "rgba(184,147,90,0.7)" }} />
        <span className="block h-1.5 w-1.5 rounded-full" style={{ background: "#B8935A" }} />
      </div>

      {/* Text-Inhalt */}
      <div className="relative z-10 flex h-full flex-col justify-center px-[6%] pt-20 pb-12 md:max-w-[58%] lg:max-w-[52%]">

        <div className="mb-12 flex items-center gap-4">
          <span className="hero-eyebrow-line h-px w-10 flex-shrink-0" style={{ background: "#B8935A" }} />
          <div style={{ overflow: "hidden" }}>
            <p className="hero-eyebrow-inner font-body text-xs font-semibold uppercase tracking-[0.28em]" style={{ color: "#B8935A" }}>
              Mühldorf am Inn · 20 Jahre Erfahrung
            </p>
          </div>
        </div>

        <h1
          className="mb-6 font-serif font-bold tracking-tight text-white"
          style={{ fontSize: "clamp(2.4rem, 4.8vw, 5.8rem)", lineHeight: 1.04, marginBottom: "3.5rem" }}
        >
          <span className="block" style={{ overflow: "hidden", paddingBottom: "0.1em" }}>
            <span className="hero-headline-inner block">
              Farbe,{" "}
              <em className="italic" style={{ color: "#B8935A" }}>die begeistert.</em>
            </span>
          </span>
          <span className="block" style={{ overflow: "hidden", paddingBottom: "0.1em" }}>
            <span className="hero-headline-inner block">
              Handwerk, das bleibt.
            </span>
          </span>
        </h1>

        <p className="hero-body mb-16 max-w-[440px] font-body text-base leading-relaxed text-white/70 md:text-lg">
          Malerei, Bautenschutz, Schimmelsanierung und mehr aus Mühldorf am Inn.
          Malerei & Bautenschutz Sascha Schmidt steht seit 20 Jahren für Qualität,
          Verlässlichkeit und langfristigen Schutz.
        </p>

        <div className="flex flex-wrap gap-3">
          <a
            href="/kontakt"
            className="hero-cta group inline-flex items-center gap-3 border border-white/40 bg-transparent px-7 py-4 font-body text-sm font-semibold uppercase tracking-[0.14em] text-white/85 transition-all duration-300 hover:bg-white hover:border-white hover:text-[#B8935A]"
          >
            Angebot anfragen
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </a>
          <a
            href="/leistungen"
            className="hero-cta group inline-flex items-center gap-3 border border-white/40 bg-transparent px-7 py-4 font-body text-sm font-semibold uppercase tracking-[0.14em] text-white/85 transition-all duration-300 hover:bg-white hover:border-white hover:text-[#B8935A]"
          >
            Leistungen entdecken
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </a>
        </div>
      </div>

    </section>
  );
}
