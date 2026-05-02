"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useMotionValue } from "framer-motion";

const projects = [
  {
    id: "01",
    image: "/images/munich-residential.jpg",
    title: "Wohnanlage München/Trudering",
    category: "Wohnungsbau · 97 WE + Tiefgarage",
    year: "2008",
  },
  {
    id: "02",
    image: "/images/villa-twilight.jpg",
    title: "Wohnpark Haydn, Markt Schwaben",
    category: "Wohnungsbau · 56 WE + Tiefgarage",
    year: "2015",
  },
  {
    id: "03",
    image: "/images/craftsmen-stone-facade.jpg",
    title: "Firma Seidenader, Markt Schwaben",
    category: "Industriebau · Produktionshalle + Büro",
    year: "2007",
  },
  {
    id: "04",
    image: "/images/interior-oak-concrete.jpg",
    title: "Wohnanlage Freisinger Str., Erding",
    category: "Wohnungsbau · 45 WE + Tiefgarage",
    year: "2023",
  },
  {
    id: "05",
    image: "/images/team-blueprints.jpg",
    title: "Neubau Turnhalle, Ebersberg",
    category: "Hochbau · Öffentlicher Bau",
    year: "2019",
  },
];

export function Gallery9() {
  const stripRef = useRef(null);
  const progress = useMotionValue(0);
  const [activeIdx, setActiveIdx] = useState(1);

  useEffect(() => {
    const el = stripRef.current;
    if (!el) return;

    const onScroll = () => {
      const max = el.scrollWidth - el.clientWidth;
      if (max <= 0) return;
      const t = el.scrollLeft / max;
      progress.set(t);

      // Approximate which project card is centred
      const introW = window.innerWidth * 0.42;
      const cardW  = window.innerWidth * 0.68;
      if (el.scrollLeft < introW * 0.8) {
        setActiveIdx(0);
      } else {
        const idx = Math.round((el.scrollLeft - introW) / cardW) + 1;
        setActiveIdx(Math.max(1, Math.min(idx, projects.length)));
      }
    };

    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, [progress]);

  return (
    <section className="relative h-screen bg-background-primary">

      {/* Hide webkit scrollbar globally for this strip */}
      <style>{`#gallery-strip::-webkit-scrollbar{display:none}`}</style>

      {/* ── Horizontally scrollable strip ── */}
      <div
        id="gallery-strip"
        ref={stripRef}
        className="flex h-full items-center gap-[2vw]"
        style={{
          overflowX: "auto",
          overflowY: "hidden",
          scrollSnapType: "x mandatory",
          WebkitOverflowScrolling: "touch",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          cursor: "grab",
        }}
      >

        {/* ── Intro card ── */}
        <div
          className="flex h-full w-[40vw] flex-shrink-0 flex-col justify-center overflow-hidden px-[5%]"
          style={{ scrollSnapAlign: "start" }}
        >
          <p className="mb-5 font-body text-sm font-semibold uppercase tracking-[0.25em] text-hoser-gold">
            Portfolio
          </p>
          <h2
            className="font-heading font-bold leading-[1.05] tracking-tight text-text-primary"
            style={{ fontSize: "clamp(2.4rem, 3.8vw, 4.5rem)" }}
          >
            Unsere<br />Projekte
          </h2>
          <div className="mt-7 h-px w-12 bg-hoser-gold/50" />
          <div className="mt-8 flex items-center gap-3 text-text-secondary">
            <span className="font-body text-xs uppercase tracking-[0.2em]">Scrollen</span>
            <span className="text-hoser-gold">→</span>
          </div>
        </div>

        {/* ── Project cards ── */}
        {projects.map((p) => (
          <ProjectCard key={p.id} project={p} />
        ))}

        {/* ── CTA card ── */}
        <div
          className="flex h-full w-[52vw] flex-shrink-0 flex-col items-start justify-center px-16"
          style={{ scrollSnapAlign: "start" }}
        >
          <p className="mb-4 font-body text-sm font-semibold uppercase tracking-[0.25em] text-hoser-gold">
            Und viele mehr
          </p>
          <h3
            className="mb-10 font-heading font-bold leading-tight tracking-tight text-text-primary"
            style={{ fontSize: "clamp(2rem, 3vw, 3.5rem)" }}
          >
            Weitere Projekte<br />entdecken
          </h3>
          <a
            href="/projekte"
            className="inline-flex items-center gap-3 bg-hoser-gold px-7 py-4 font-body text-sm font-semibold uppercase tracking-[0.1em] text-white transition-opacity duration-200 hover:opacity-85 whitespace-nowrap"
          >
            Alle Projekte ansehen →
          </a>
        </div>

      </div>

      {/* ── Gold progress bar ── */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-border-primary">
        <motion.div
          className="h-full origin-left bg-hoser-gold"
          style={{ scaleX: progress }}
        />
      </div>

      {/* ── Counter ── */}
      <div className="pointer-events-none absolute bottom-6 right-8 flex items-center gap-2 font-body text-xs text-text-secondary">
        <span className="font-semibold tabular-nums text-text-primary">
          {String(activeIdx).padStart(2, "0")}
        </span>
        <span>/</span>
        <span>{String(projects.length).padStart(2, "0")}</span>
      </div>

    </section>
  );
}

function ProjectCard({ project }) {
  return (
    <a
      href="/projekte"
      className="group relative flex-shrink-0 overflow-hidden"
      style={{ width: "66vw", height: "78vh", scrollSnapAlign: "start" }}
    >
      <img
        src={project.image}
        alt={project.title}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />

      {/* Side accent */}
      <div className="absolute left-0 top-0 bottom-0 w-px bg-hoser-gold/30 transition-all duration-300 group-hover:bg-hoser-gold/70" />

      {/* Info */}
      <div className="absolute bottom-8 left-8 right-8 translate-y-1 transition-transform duration-500 group-hover:translate-y-0">
        <div className="mb-3 flex items-center gap-3">
          <span className="h-px w-7 flex-shrink-0 bg-hoser-gold" />
          <p className="font-body text-xs font-semibold uppercase tracking-[0.2em] text-hoser-gold">
            {project.category} · {project.year}
          </p>
        </div>
        <h3
          className="font-heading font-bold leading-tight text-white"
          style={{ fontSize: "clamp(1.4rem, 2.2vw, 2.4rem)" }}
        >
          {project.title}
        </h3>
      </div>

      {/* Ghost number */}
      <div
        className="pointer-events-none absolute right-6 top-6 font-heading font-bold leading-none text-white/6"
        style={{ fontSize: "clamp(4rem, 10vw, 9rem)" }}
      >
        {project.id}
      </div>

      {/* Arrow */}
      <div className="absolute right-8 bottom-8 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <span className="font-body text-sm font-semibold text-hoser-gold">→</span>
      </div>
    </a>
  );
}
