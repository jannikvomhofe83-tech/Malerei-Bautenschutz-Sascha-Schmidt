"use client";

import { useRef, useEffect } from "react";
import { gsap, ScrollTrigger } from "../../../utils/gsap";

const michael = {
  num: "01",
  name: "Sascha Schmidt",
  title: "Inhaber",
  role: "Meister",
  image: "/images/michael-schmid.png",
  email: "info@malerei-schmidt.de",
  bio: "Seit 20 Jahren ist Sascha Schmidt als Maler und Lackierer im Bauhandwerk tätig. Er führt jeden Auftrag mit Leidenschaft, Präzision und persönlichem Einsatz durch – von der Farbberatung bis zur fachgerechten Schimmelsanierung in Mühldorf am Inn und Umgebung.",
  facts: [
    { label: "Unternehmen", value: "Malerei & Bautenschutz Sascha Schmidt" },
    { label: "Schwerpunkt", value: "Malerei, Bautenschutz & Sanierung" },
    { label: "Erfahrung", value: "20 Jahre im Bauhandwerk" },
  ],
};

export function TeamSection() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const scope = sectionRef.current;
    if (!scope) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: scope,
          start: "top 75%",
          once: true,
        },
        defaults: { ease: "power3.out" },
      });

      // Image: clip-path wipe in from right
      tl.fromTo(".team-img-wrap",
        { clipPath: "inset(0 100% 0 0)" },
        { clipPath: "inset(0 0% 0 0)", duration: 1.1, ease: "power2.inOut" },
        0
      );

      // Eyebrow label
      tl.fromTo(".team-eyebrow",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 },
        0.2
      );

      // Name – mask reveal
      tl.fromTo(".team-name-inner",
        { y: "105%" },
        { y: "0%", duration: 0.85 },
        0.35
      );

      // Sub-title
      tl.fromTo(".team-subtitle",
        { y: 16, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.55 },
        0.55
      );

      // Gold divider line
      tl.fromTo(".team-divider",
        { scaleX: 0, transformOrigin: "left center" },
        { scaleX: 1, duration: 0.6 },
        0.65
      );

      // Bio paragraph
      tl.fromTo(".team-bio",
        { y: 22, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7 },
        0.75
      );

      // Fact rows staggered
      tl.fromTo(".team-fact",
        { y: 16, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.1, duration: 0.5 },
        0.9
      );

      // Email
      tl.fromTo(".team-email",
        { y: 10, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.45 },
        1.2
      );
    }, scope);

    return () => ctx.revert();
  }, []);

  return (
    <div className="relative" style={{ backgroundColor: "#141414" }} ref={sectionRef}>

      <div className="relative h-screen w-full overflow-hidden flex">

        {/* Links: Text */}
        <div className="flex h-full w-1/2 flex-col justify-center px-12 md:px-16 lg:px-20">
          <p className="team-eyebrow mb-5 font-body text-xs font-semibold uppercase tracking-[0.32em]" style={{ color: "#B8935A" }}>
            {michael.num} · Inhaber & Meister
          </p>

          <div style={{ overflow: "hidden", marginBottom: "0.5rem" }}>
            <h2
              className="team-name-inner font-heading font-bold leading-tight tracking-tight text-white"
              style={{ fontSize: "clamp(2rem, 3.5vw, 3.5rem)" }}
            >
              {michael.name}
            </h2>
          </div>

          <p className="team-subtitle mb-8 font-body text-sm uppercase tracking-[0.18em] text-white/50">
            {michael.title} · {michael.role}
          </p>

          <div className="team-divider mb-8 h-px w-12" style={{ backgroundColor: "#B8935A" }} />

          <p className="team-bio mb-10 max-w-md font-body text-sm leading-relaxed text-white/60 md:text-base">
            {michael.bio}
          </p>

          <div className="mb-10 space-y-4">
            {michael.facts.map((f) => (
              <div key={f.label} className="team-fact flex items-baseline gap-4">
                <span className="w-28 shrink-0 font-body text-xs font-semibold uppercase tracking-[0.18em]" style={{ color: "#B8935A" }}>
                  {f.label}
                </span>
                <span className="font-body text-sm text-white/80">{f.value}</span>
              </div>
            ))}
          </div>

          <a
            href={`mailto:${michael.email}`}
            className="team-email inline-flex items-center gap-2 font-body text-sm text-white/50 transition-colors duration-200 hover:text-white"
          >
            {michael.email} <span style={{ color: "#B8935A" }}>→</span>
          </a>
        </div>

        {/* Rechts: Platzhalter */}
        <div className="team-img-wrap h-full w-1/2 flex flex-col items-center justify-center gap-4" style={{ backgroundColor: "#1C1C1C" }}>
          <div style={{
            width: 96,
            height: 96,
            borderRadius: "50%",
            border: "2px dashed rgba(184,147,90,0.4)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}>
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="rgba(184,147,90,0.5)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
              <circle cx="12" cy="7" r="4"/>
            </svg>
          </div>
          <p style={{ fontFamily: "Syne, sans-serif", fontSize: "0.65rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "rgba(184,147,90,0.4)" }}>
            Foto folgt
          </p>
        </div>

      </div>
    </div>
  );
}
