"use client";

import React from "react";

const testimonials = [
  {
    quote: "Sascha hat von uns den Auftrag erhalten, unser Haus (230 qm Wohnfläche) innen weiß zu streichen. Schon der erste Kontakt war herzlich und professionell.",
    name: "Dirk R.",
    role: "Google-Rezension · 5/5",
    initials: "DR",
  },
  {
    quote: "Wir haben Sascha beauftragt, unsere Wohnung für eine Übergabe zu streichen und zu reinigen.",
    name: "Tobias F.",
    role: "Google-Rezension · 5/5",
    initials: "TF",
  },
  {
    quote: "Klare Weiterempfehlung! Freundlicher Kontakt, kurzfristige Besichtigung und dann zeitnahe Ausführung. Jederzeit wieder 👍",
    name: "Google-Kunde",
    role: "Google-Rezension · 5/5",
    initials: "★",
  },
];

export function Testimonial3() {
  return (
    <section className="bg-background-alternative px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="mx-auto mb-12 w-full max-w-xl text-center md:mb-18 lg:mb-20">
          <p className="mb-4 font-body text-sm font-semibold uppercase tracking-[0.2em]" style={{ color: "#B8935A" }}>
            Kundenstimmen
          </p>
          <h2 className="mb-4 font-heading text-5xl font-bold leading-tight tracking-tight text-text-alternative md:text-7xl lg:text-8xl">
            Was Kunden sagen
          </h2>
          <p className="font-body text-base text-text-alternative/70 md:text-lg">
            Aus dem Raum Mühldorf am Inn – echte Projekte, echte Menschen.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3 lg:gap-12">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="flex flex-col border border-border-alternative p-8 transition-colors duration-300"
              style={{ borderColor: undefined }}
              onMouseEnter={e => e.currentTarget.style.borderColor = "#B8935A"}
              onMouseLeave={e => e.currentTarget.style.borderColor = ""}
            >
              <div className="mb-6 text-4xl leading-none font-heading" style={{ color: "#B8935A" }}>"</div>
              <blockquote className="mb-8 flex-1 font-body text-base font-medium leading-relaxed text-text-alternative/90 md:text-lg">
                {t.quote}
              </blockquote>
              <div className="flex items-center gap-4">
                <div className="flex size-12 shrink-0 items-center justify-center font-heading text-sm font-bold tracking-wide text-white" style={{ backgroundColor: "#B8935A" }}>
                  {t.initials}
                </div>
                <div>
                  <p className="font-heading text-sm font-bold tracking-wide text-text-alternative">
                    {t.name}
                  </p>
                  <p className="font-body text-xs text-text-alternative/60">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
