"use client";

import React from "react";

const vorteile = [
  {
    num: "01",
    title: "Fairer Lohn",
    desc: "Übertarifliche Bezahlung und pünktliche Gehaltszahlungen – verlässlich, transparent und leistungsgerecht.",
  },
  {
    num: "02",
    title: "Modernster Maschinenpark",
    desc: "Neueste Maschinen und Geräte für effizientes und sicheres Arbeiten. Wir investieren kontinuierlich in Technik.",
  },
  {
    num: "03",
    title: "Eigene Ausbildung",
    desc: "Wir bilden selbst aus und fördern gezielt – vom Lehrling über den Facharbeiter bis zum Polier und Meister.",
  },
  {
    num: "04",
    title: "Familiäres Team",
    desc: "70 Jahre Familienunternehmen. Flache Hierarchien, direkte Kommunikation, Respekt und Zusammenhalt.",
  },
  {
    num: "05",
    title: "Sicherer Arbeitsplatz",
    desc: "Konstante Auftragslage durch starkes regionales Netzwerk – über 500 abgeschlossene Projekte seit 1952.",
  },
  {
    num: "06",
    title: "Weiterbildung & Entwicklung",
    desc: "Interne und externe Schulungen für alle Mitarbeiter. Wir investieren in deine fachliche Weiterentwicklung.",
  },
];

export function KarriereVorteile() {
  return (
    <section
      id="jobs"
      className="overflow-hidden"
      style={{ background: "linear-gradient(135deg, #0d1a2e 0%, #111827 60%, #0a1020 100%)" }}
    >
      {/* Top: image background behind heading */}
      <div
        className="relative px-[5%] py-16 md:py-24 lg:py-28"
        style={{
          backgroundImage: "url('/images/bild14.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center 30%",
        }}
      >
        {/* Overlay: transparent in the middle so image shows, dark at edges */}
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(to bottom, rgba(10,16,32,0.55) 0%, rgba(10,16,32,0.30) 40%, rgba(13,21,32,0.70) 75%, rgba(13,21,32,1) 100%)",
          }}
        />

        {/* Decorative background text */}
        <div
          className="pointer-events-none absolute right-[-2%] top-[50%] -translate-y-1/2 select-none font-heading font-bold leading-none text-white/[0.06]"
          style={{ fontSize: "clamp(6rem, 18vw, 20rem)" }}
          aria-hidden="true"
        >
          HOSER
        </div>

        <div className="container relative z-10">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:items-end">
            <div>
              <p className="mb-3 font-body text-sm font-semibold uppercase tracking-[0.25em] text-[#C41E3A]">
                Karriere bei Hoser
              </p>
              <h2
                className="font-heading font-bold leading-tight tracking-tight text-white"
                style={{ fontSize: "clamp(2rem, 4vw, 4rem)" }}
              >
                Warum bei uns arbeiten?
              </h2>
            </div>
            <div className="md:text-right">
              <p className="font-body text-base leading-relaxed text-white/70 max-w-md md:ml-auto">
                Als gewachsenes Familienunternehmen bieten wir mehr als nur einen Job –
                einen Arbeitsplatz, der sich lohnt. Langfristig, sicher und fair.
              </p>
              <a
                href="#stellenangebote"
                className="mt-6 inline-flex items-center gap-2 border border-[#C41E3A]/50 px-6 py-3 font-body text-sm font-semibold uppercase tracking-[0.1em] text-[#C41E3A] transition-all duration-200 hover:bg-[#C41E3A] hover:text-white hover:border-[#C41E3A]"
              >
                Alle Stellen ansehen →
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Benefits grid */}
      <div className="px-[5%] pb-16 md:pb-24 lg:pb-28">
        <div className="container">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/[0.06]">
            {vorteile.map((v) => (
              <div
                key={v.num}
                className="group relative bg-[#0d1520] p-8 md:p-10 transition-colors duration-300 hover:bg-white/[0.04]"
              >
                <span className="mb-6 block font-body text-[10px] font-semibold uppercase tracking-[0.3em] text-[#C41E3A]/60">
                  {v.num}
                </span>
                <h3 className="mb-3 font-heading text-lg font-bold text-white md:text-xl transition-colors duration-300 group-hover:text-[#C41E3A]">
                  {v.title}
                </h3>
                <p className="font-body text-sm leading-relaxed text-white/45">
                  {v.desc}
                </p>
                <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-[#C41E3A] transition-all duration-500 group-hover:w-full" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
