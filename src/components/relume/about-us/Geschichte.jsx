"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const milestones = [
  {
    year: "1952",
    title: "Die Gründung",
    desc: "Michael Hoser gründet das Unternehmen als kleinen Maurerbetrieb mit drei Mitarbeitern in Markt Schwaben. Handwerk, Verlässlichkeit und Qualität sind von Anfang an die Grundwerte.",
    detail: "Was als bescheidener Familienbetrieb begann, legte den Grundstein für eine über siebzigjährige Erfolgsgeschichte im bayerischen Bauhandwerk.",
  },
  {
    year: "1970er",
    title: "Zweite Generation",
    desc: "Die Söhne Dieter und Manfred Hoser übernehmen den Betrieb und bauen ihn konsequent aus. Das Team wächst auf rund 30 Mitarbeiter.",
    detail: "Das Leistungsspektrum erweitert sich auf Hoch-, Tief- und Kanalbau. Die Eigenständigkeit durch eigenes Fachpersonal wird zum Markenzeichen.",
  },
  {
    year: "1990er",
    title: "Wachstum & Modernisierung",
    desc: "Investitionen in einen umfangreichen Maschinenpark und die Ausbildung eigener Fachkräfte sichern Unabhängigkeit und Qualität auf höchstem Niveau.",
    detail: "Hoser entwickelt sich zu einem der führenden Bauunternehmen im Großraum München – mit über 60 festangestellten Mitarbeitern.",
  },
  {
    year: "2010er",
    title: "Dritte Generation",
    desc: "Claudia Hoser und Josef Lippacher übernehmen die Geschäftsführung. Sie führen das Familienunternehmen mit modernen Strukturen in die Zukunft.",
    detail: "Der Anspruch bleibt derselbe: Qualität, Termintreue und Festpreisgarantie. Neue digitale Prozesse ergänzen das bewährte Handwerk.",
  },
  {
    year: "Heute",
    title: "70+ Jahre Baukultur",
    desc: "Über 70 Jahre nach der Gründung steht Hoser Bauunternehmen für bayerisches Handwerk auf höchstem Niveau. Über 500 abgeschlossene Projekte sprechen für sich.",
    detail: "Mit eigenem Fachpersonal, modernem Maschinenpark und einem starken regionalen Netzwerk bauen wir an der Zukunft des Großraums München.",
  },
];

export function Geschichte() {
  const sectionRef = useRef(null);
  const lineRef = useRef(null);
  const dotRefs = useRef([]);
  const cardRefs = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {

      // Red thread grows from top to bottom as section scrolls into view
      gsap.fromTo(
        lineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          transformOrigin: "top center",
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 55%",
            end: "bottom 75%",
            scrub: 1.2,
          },
        }
      );

      // Each dot pops in when the line reaches it
      dotRefs.current.forEach((dot) => {
        if (!dot) return;
        gsap.fromTo(
          dot,
          { scale: 0, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.5,
            ease: "back.out(2.5)",
            scrollTrigger: {
              trigger: dot,
              start: "top 72%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      // Each milestone card slides in from the right
      cardRefs.current.forEach((card) => {
        if (!card) return;
        gsap.fromTo(
          card,
          { opacity: 0, x: 60 },
          {
            opacity: 1,
            x: 0,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 75%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-[#f0f0ef] overflow-hidden">

      {/* Top third — image background with heading */}
      <div
        className="relative px-[5%] py-16 md:py-24 lg:py-28"
        style={{
          backgroundImage: "url('/images/geschichte-mauerwerk.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center 40%",
        }}
      >
        {/* Overlay so text stays readable */}
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(to bottom, rgba(240,240,239,0.82) 0%, rgba(240,240,239,0.92) 60%, rgba(240,240,239,1) 100%)",
          }}
        />

        <div className="container relative z-10">
          <div className="max-w-2xl">
            <p className="mb-3 font-body text-sm font-semibold uppercase tracking-[0.25em] text-[#C41E3A]">
              Seit 1952
            </p>
            <h2
              className="mb-5 font-heading font-bold leading-tight tracking-tight text-[#0a1020]"
              style={{ fontSize: "clamp(2rem, 4vw, 4rem)" }}
            >
              Unsere Geschichte
            </h2>
            <p className="font-body text-base leading-relaxed text-[#0a1020]/55">
              Drei Generationen. Eine Familie.<br />Ein Anspruch: Bauen, das hält.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom two thirds — timeline on plain background */}
      <div className="px-[5%] pb-16 md:pb-24 lg:pb-28">
        <div className="container">

          {/* Timeline */}
        <div className="relative">

          {/* Red thread — full height, grows with scroll */}
          <div
            className="absolute top-0 bottom-0"
            style={{
              left: "18px",
              width: "12px",
              background: "linear-gradient(to right, rgba(80,0,10,0.25) 0%, #e0dfdc 30%, #e8e7e4 50%, #e0dfdc 70%, rgba(80,0,10,0.15) 100%)",
              borderRadius: "6px",
            }}
          >
            <div
              ref={lineRef}
              className="absolute inset-0 origin-top"
              style={{
                borderRadius: "6px",
                background: "linear-gradient(to right, rgba(100,0,15,0.8) 0%, #C41E3A 25%, #FF5C72 50%, #C41E3A 75%, rgba(100,0,15,0.8) 100%)",
                boxShadow: "2px 0 8px rgba(196,30,58,0.45), -1px 0 4px rgba(0,0,0,0.15)",
                transform: "scaleY(0)",
              }}
            />
          </div>

          {/* Milestones */}
          <div>
            {milestones.map((m, i) => (
              <div
                key={m.year}
                className="relative grid grid-cols-[48px_1fr] pb-14 last:pb-0"
              >
                {/* Dot on the thread — 3D sphere */}
                <div className="flex justify-center pt-2 z-10">
                  <div
                    ref={(el) => (dotRefs.current[i] = el)}
                    className="flex-shrink-0"
                    style={{
                      width: "22px",
                      height: "22px",
                      borderRadius: "50%",
                      background: "radial-gradient(circle at 35% 32%, #FF8090, #C41E3A 48%, #7A0010 100%)",
                      boxShadow: "0 0 0 3px #f0f0ef, 0 0 0 5px rgba(196,30,58,0.5), 2px 3px 8px rgba(0,0,0,0.3)",
                      opacity: 0,
                      transform: "scale(0)",
                    }}
                  />
                </div>

                {/* Milestone content */}
                <div
                  ref={(el) => (cardRefs.current[i] = el)}
                  className="pl-8 md:pl-12"
                  style={{ opacity: 0 }}
                >
                  {/* Year + number */}
                  <div className="flex items-baseline gap-4 mb-3">
                    <span
                      className="font-heading font-bold leading-none text-[#0a1020]/[0.07] select-none"
                      style={{ fontSize: "clamp(2rem, 3.5vw, 3.25rem)" }}
                    >
                      {m.year}
                    </span>
                    <span className="font-body text-[10px] font-semibold uppercase tracking-[0.3em] text-[#C41E3A]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <h3 className="mb-3 font-heading text-2xl font-bold text-[#0a1020] md:text-3xl">
                    {m.title}
                  </h3>
                  <p className="mb-2 font-body text-base leading-relaxed text-[#0a1020]/65 max-w-2xl">
                    {m.desc}
                  </p>
                  <p className="font-body text-sm leading-relaxed text-[#0a1020]/40 max-w-xl">
                    {m.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>

          </div>{/* end timeline relative */}
        </div>{/* end container */}
      </div>{/* end bottom section */}
    </section>
  );
}
