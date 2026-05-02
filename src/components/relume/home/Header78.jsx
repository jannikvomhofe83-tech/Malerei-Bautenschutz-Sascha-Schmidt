"use client";

import { useRef, useState, useCallback } from "react";

export function Header78() {
  const imageRef = useRef(null);
  const [cursor, setCursor] = useState({ x: 0, y: 0, active: false });

  const handleMouseMove = useCallback((e) => {
    if (!imageRef.current) return;
    const rect = imageRef.current.getBoundingClientRect();
    setCursor({ x: e.clientX - rect.left, y: e.clientY - rect.top, active: true });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setCursor((c) => ({ ...c, active: false }));
  }, []);

  return (
    <section
      ref={imageRef}
      className="relative min-h-screen overflow-hidden"
      style={{ cursor: "none" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* ── Bild 1: Rohbau — vollflächiger Hintergrund ── */}
      <img
        src="/images/bild1.png"
        alt="Gebäude im Rohbau"
        className="absolute inset-0 h-full w-full object-cover object-center"
      />

      {/* Dunkler Verlauf von links (Text) nach rechts (Bild sichtbar) */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to right, rgba(4,13,28,0.97) 0%, rgba(4,13,28,0.85) 35%, rgba(4,13,28,0.35) 60%, rgba(4,13,28,0.1) 100%)",
        }}
      />

      {/* ── Bild 2: Fertig — wird per Hover-Radius enthüllt ── */}
      <img
        src="/images/bild2.png"
        alt="Fertiggestelltes Gebäude"
        className="absolute inset-0 h-full w-full object-cover object-center"
        style={{
          clipPath: `circle(${cursor.active ? 180 : 0}px at ${cursor.x}px ${cursor.y}px)`,
          transition: "clip-path 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        }}
      />

      {/* Goldener Ring an der Reveal-Kante */}
      <div
        className="pointer-events-none absolute rounded-full border border-hoser-gold/75"
        style={{
          left: cursor.x,
          top: cursor.y,
          width: cursor.active ? 360 : 0,
          height: cursor.active ? 360 : 0,
          transform: "translate(-50%, -50%)",
          opacity: cursor.active ? 1 : 0,
          transition:
            "width 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94), height 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.2s",
        }}
      />

      {/* ── Text-Inhalt links ── */}
      <div className="relative z-10 flex min-h-screen flex-col justify-center px-[6%] py-32 md:max-w-[55%] lg:max-w-[50%]">

        {/* Eyebrow */}
        <div className="mb-8 flex items-center gap-4">
          <span className="h-px w-10 flex-shrink-0 bg-hoser-gold" />
          <p className="font-body text-xs font-semibold uppercase tracking-[0.25em] text-white/50">
            Markt Schwaben · Gegründet 1952
          </p>
        </div>

        {/* Headline */}
        <h1
          className="mb-8 font-serif font-bold leading-[1.04] tracking-tight text-white"
          style={{ fontSize: "clamp(2.8rem, 5.5vw, 6.5rem)" }}
        >
          Bauen,{" "}
          <em className="italic">das bleibt.</em>
          <br />
          Seit drei{" "}
          Generationen.
        </h1>

        {/* Body */}
        <p className="mb-10 max-w-[420px] font-body text-base leading-relaxed text-white/55 md:text-lg">
          Hochbau, Sanierung, Tiefbau, Ingenieurbau und Gewerbebau aus Markt Schwaben.
          Hoser Bauunternehmung steht seit 1952 für meisterliche Handwerkskunst,
          Termintreue und Bauwerke, die Generationen überdauern.
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap gap-4">
          <a
            href="/kontakt"
            className="inline-flex items-center gap-2 border border-white px-8 py-4 font-body text-sm font-semibold uppercase tracking-[0.12em] text-white transition-colors duration-200 hover:bg-white hover:text-background-alternative"
          >
            Projekt anfragen <span>→</span>
          </a>
          <a
            href="/projekte"
            className="inline-flex items-center gap-2 border border-white px-8 py-4 font-body text-sm font-semibold uppercase tracking-[0.12em] text-white transition-colors duration-200 hover:bg-white hover:text-background-alternative"
          >
            Referenzen ansehen <span>→</span>
          </a>
        </div>
      </div>

      {/* Scroll-Indikator */}
      <div className="absolute bottom-8 left-[6%] z-10 hidden lg:flex items-center gap-3">
        <span className="h-px w-8 bg-white/20" />
        <span className="font-body text-xs uppercase tracking-[0.2em] text-white/30">Scroll</span>
      </div>
    </section>
  );
}
