"use client";

import React, { useState, useEffect, useRef } from "react";
import { gsap } from "../../../utils/gsap";

const splitWords = (el, text) => {
  el.innerHTML = "";
  return text.split(" ").map((word, i, arr) => {
    const wrap = document.createElement("span");
    wrap.style.display = "inline-block";
    wrap.style.overflow = "hidden";
    wrap.style.paddingBottom = "0.08em";
    if (i < arr.length - 1) wrap.style.marginRight = "0.28em";
    const inner = document.createElement("span");
    inner.style.display = "inline-block";
    inner.style.willChange = "transform";
    inner.textContent = word;
    wrap.appendChild(inner);
    el.appendChild(wrap);
    return inner;
  });
};

const jobs = [
  {
    title: "Maler & Lackierer (m/w/d)",
    type: "Vollzeit",
    location: "Mühldorf am Inn und Umgebung",
    desc: "Innen- und Außenanstriche, Spachtelarbeiten und Farbgestaltung. Du arbeitest mit modernen Airless-Systemen und hochwertigen Materialien.",
    anforderungen: [
      "Abgeschlossene Ausbildung als Maler & Lackierer",
      "Erfahrung in Spachtelarbeiten und Farbgestaltung",
      "Teamfähigkeit, Sorgfalt und Zuverlässigkeit",
      "Führerschein Klasse B von Vorteil",
    ],
    bieten: [
      "Übertarifliche, pünktliche Bezahlung",
      "Hochwertige Arbeitskleidung & Ausrüstung",
      "Familiäres Team mit flachen Hierarchien",
      "Volle Auftragsbücher – sicherer Arbeitsplatz",
    ],
  },
  {
    title: "Bautenschutz-Fachkraft (m/w/d)",
    type: "Vollzeit",
    location: "Mühldorf am Inn und Umgebung",
    desc: "Schimmelsanierung, Feuchtigkeitsschutz und Betonsanierung. Du erkennst Schäden, findest Ursachen und setzt fachgerechte Maßnahmen um.",
    anforderungen: [
      "Erfahrung im Bereich Bautenschutz oder Sanierung",
      "Kenntnisse in Schimmelsanierung und Abdichtung",
      "Selbstständige, sorgfältige Arbeitsweise",
      "Führerschein Klasse B",
    ],
    bieten: [
      "Abwechslungsreiche Projekte in der Region",
      "Moderne Maschinen und Profi-Materialien",
      "Weiterbildungsmöglichkeiten im Bautenschutz",
      "Direkter Ansprechpartner – kein Konzernapparat",
    ],
  },
  {
    title: "Auszubildender Maler & Lackierer (m/w/d)",
    type: "Ausbildung",
    location: "Mühldorf am Inn und Umgebung",
    desc: "Starte deine Ausbildung in einem echten Handwerksbetrieb. Du lernst von Grund auf – von der Farbmischung bis zur Airless-Technik und Schimmelsanierung.",
    anforderungen: [
      "Hauptschulabschluss oder höher",
      "Interesse an Farbe, Gestaltung und Handwerk",
      "Zuverlässigkeit und Lernbereitschaft",
      "Freude an praktischer Arbeit",
    ],
    bieten: [
      "Persönliche Betreuung durch Meister Sascha Schmidt",
      "Faire Ausbildungsvergütung",
      "Übernahme nach erfolgreichem Abschluss möglich",
      "Moderne Werkzeuge und Ausrüstung von Anfang an",
    ],
  },
];

export function Karriere() {
  const [openIdx, setOpenIdx] = useState(null);

  const sectionRef = useRef(null);
  const eyebrowRef = useRef(null);
  const headingRef = useRef(null);
  const subRef     = useRef(null);
  const cardsRef   = useRef([]);
  const contactRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading reveal
      gsap.set(eyebrowRef.current, { y: 22, opacity: 0 });
      const headingWords = headingRef.current
        ? splitWords(headingRef.current, "Offene Stellen")
        : [];
      gsap.set(headingWords, { yPercent: 110 });
      gsap.set(subRef.current, { y: 18, opacity: 0 });

      gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
        defaults: { force3D: true },
      })
        .to(eyebrowRef.current, { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" })
        .to(headingWords, { yPercent: 0, duration: 1.0, ease: "expo.out", stagger: 0.07 }, "-=0.35")
        .to(subRef.current, { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" }, "-=0.5");

      // Per-card cascade entrance
      cardsRef.current.filter(Boolean).forEach((card, idx) => {
        gsap.set(card, { y: 40, opacity: 0 });
        gsap.to(card, {
          y: 0, opacity: 1, duration: 0.8, ease: "expo.out",
          scrollTrigger: {
            trigger: card,
            start: "top 92%",
            toggleActions: "play none none reverse",
          },
          delay: (idx % 2) * 0.08,
        });
      });

      // Contact box reveal
      if (contactRef.current) {
        gsap.set(contactRef.current, { y: 40, opacity: 0 });
        gsap.to(contactRef.current, {
          y: 0, opacity: 1, duration: 0.9, ease: "expo.out",
          scrollTrigger: {
            trigger: contactRef.current,
            start: "top 88%",
            toggleActions: "play none none reverse",
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="stellenangebote"
      className="overflow-hidden"
      style={{ background: "linear-gradient(180deg, #B8935A 0%, #0D0D0D 100%)" }}
    >
      {/* Heading with image background */}
      <div
        className="relative px-[5%] py-16 md:py-24 lg:py-28"
        style={{
          backgroundImage: "url('/images/karriere-offene-stellen.png')",
          backgroundSize: "cover",
          backgroundPosition: "center 40%",
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(to bottom, rgba(184,147,90,0.55) 0%, rgba(184,147,90,0.30) 40%, rgba(184,147,90,0.78) 75%, rgba(13,13,13,1) 100%)",
          }}
        />
        <div className="container relative z-10">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:items-end">
            <div>
              <p ref={eyebrowRef} className="mb-3 font-body text-sm font-semibold uppercase tracking-[0.25em] text-white/60">
                Stellenangebote
              </p>
              <h2
                ref={headingRef}
                className="font-heading font-bold leading-tight tracking-tight text-white"
                style={{ fontSize: "clamp(2rem, 4vw, 4rem)" }}
              >
                Offene Stellen
              </h2>
            </div>
            <div>
              <p ref={subRef} className="font-body text-base leading-relaxed text-white/65">
                Wir suchen laufend Maler-Gesellen, Bautenschutz-Fachkräfte und Auszubildende.
                Alle Stellen mit sofortigem Einstieg und fairer Bezahlung.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Job list + contact */}
      <div className="px-[5%] pb-16 md:pb-24 lg:pb-28">
        <div className="container">

        {/* Job cards grid */}
        <div className="mb-14 mt-2 grid grid-cols-1 md:grid-cols-2 gap-3">
          {jobs.map((job, i) => {
            const isOpen = openIdx === i;
            return (
              <div
                key={job.title}
                ref={(el) => (cardsRef.current[i] = el)}
                className="group relative cursor-pointer"
                onClick={() => setOpenIdx(isOpen ? null : i)}
              >
                <div
                  className="relative overflow-hidden transition-all duration-300"
                  style={{
                    background: isOpen ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.02)",
                    border: "1px solid",
                    borderColor: isOpen ? "rgba(255,255,255,0.4)" : "rgba(255,255,255,0.08)",
                    borderLeft: `3px solid ${isOpen ? "#FFFFFF" : "rgba(255,255,255,0.12)"}`,
                  }}
                >
                  {/* Ghost number */}
                  <span
                    className="pointer-events-none absolute right-5 top-4 select-none font-heading font-bold leading-none text-white"
                    style={{ fontSize: "5rem", opacity: 0.04 }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  {/* Card header — always visible */}
                  <div className="p-7 pb-5">
                    <div className="mb-3 flex flex-wrap items-center gap-2">
                      <span className="font-body text-[10px] font-semibold uppercase tracking-[0.28em] text-white/70">
                        {job.type}
                      </span>
                      <span className="text-white/15">·</span>
                      <span className="font-body text-[10px] uppercase tracking-wider text-white/30">
                        {job.location}
                      </span>
                    </div>

                    <h3
                      className="mb-4 font-heading font-bold text-white transition-colors duration-200 group-hover:text-white"
                      style={{ fontSize: "clamp(1.1rem, 2vw, 1.5rem)" }}
                    >
                      {job.title}
                    </h3>

                    <div className="flex items-center justify-between gap-4">
                      <p className="font-body text-xs text-white/35 leading-relaxed line-clamp-1 max-w-[260px]">
                        {job.desc.split(".")[0]}.
                      </p>
                      <div
                        className="flex-shrink-0 w-8 h-8 rounded-full border border-white/25 flex items-center justify-center text-white text-lg transition-all duration-300 group-hover:border-white/70"
                        style={{ transform: isOpen ? "rotate(45deg)" : "rotate(0deg)", transition: "transform 0.3s ease" }}
                      >
                        +
                      </div>
                    </div>
                  </div>

                  {/* Expandable details */}
                  <div
                    className="overflow-hidden"
                    style={{ maxHeight: isOpen ? "500px" : "0px", transition: "max-height 0.5s ease" }}
                  >
                    <div className="px-7 pb-7 pt-1 border-t border-white/8">
                      <p className="mb-6 mt-4 font-body text-sm leading-relaxed text-white/55">
                        {job.desc}
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                        <div>
                          <p className="mb-3 font-body text-[10px] font-semibold uppercase tracking-[0.25em] text-white">
                            Was du mitbringst
                          </p>
                          <ul className="space-y-2">
                            {job.anforderungen.map((a) => (
                              <li key={a} className="flex items-start gap-2.5 font-body text-xs text-white/50">
                                <span className="mt-[5px] flex-shrink-0 w-[4px] h-[4px] rounded-full bg-white/60" />
                                {a}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <p className="mb-3 font-body text-[10px] font-semibold uppercase tracking-[0.25em] text-white">
                            Was wir bieten
                          </p>
                          <ul className="space-y-2">
                            {job.bieten.map((b) => (
                              <li key={b} className="flex items-start gap-2.5 font-body text-xs text-white/50">
                                <span className="mt-[5px] flex-shrink-0 w-[4px] h-[4px] rounded-full bg-white/60" />
                                {b}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      <a
                        href="mailto:info@malerei-schmidt.de"
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center gap-2 bg-white px-5 py-2.5 font-body text-xs font-semibold uppercase tracking-[0.12em] transition-opacity hover:opacity-90"
                        style={{ color: "#B8935A" }}
                      >
                        Jetzt bewerben →
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Contact box */}
        <div ref={contactRef} className="border border-white/10 px-8 py-10 md:px-12">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:items-center">
            <div>
              <p className="mb-2 font-body text-xs font-semibold uppercase tracking-[0.25em] text-white">
                Initiativbewerbung & Kontakt
              </p>
              <h3 className="font-heading text-2xl font-bold text-white md:text-3xl">
                Kein passendes Angebot?
              </h3>
              <p className="mt-3 font-body text-sm text-white/50 leading-relaxed">
                Wir freuen uns jederzeit über Initiativbewerbungen qualifizierter Handwerker.
                Schriftlich an:<br />
                <span className="text-white/70">Malerei & Bautenschutz Sascha Schmidt · Kreuzstraße 19 · 85459 Mühldorf am Inn</span>
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <a
                href="mailto:info@malerei-schmidt.de"
                className="inline-flex items-center gap-3 border border-white/15 px-6 py-4 font-body text-sm text-white transition-all duration-200 hover:border-white hover:bg-white/5"
              >
                <span className="text-white text-base">✉</span>
                info@malerei-schmidt.de
              </a>
              <a
                href="tel:+491707795316"
                className="inline-flex items-center gap-3 border border-white/15 px-6 py-4 font-body text-sm text-white transition-all duration-200 hover:border-white hover:bg-white/5"
              >
                <span className="text-white text-base">☎</span>
                0170 / 779 5316
              </a>
            </div>
          </div>
        </div>

        </div>{/* end container */}
      </div>{/* end bottom section */}
    </section>
  );
}
