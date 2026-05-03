"use client";

import React, { useState } from "react";

const jobs = [
  {
    title: "Maurer",
    type: "Vollzeit",
    location: "Raum München / Ebersberg / Erding",
    desc: "Maurerarbeiten auf unseren Baustellen im Großraum München. Du arbeitest an abwechslungsreichen Projekten – vom Wohnungsbau bis zur Gewerbehalle.",
    anforderungen: [
      "Abgeschlossene Ausbildung als Maurer",
      "Erfahrung im Roh- und Mauerwerksbau",
      "Teamfähigkeit und Zuverlässigkeit",
      "Führerschein Klasse B von Vorteil",
    ],
    bieten: [
      "Übertarifliche Entlohnung",
      "Moderne Arbeitsmittel und Schutzausrüstung",
      "Langfristige Anstellung in einem stabilen Unternehmen",
      "Kollegiales, eingespieltes Team",
    ],
  },
  {
    title: "Schalungszimmerer",
    type: "Vollzeit",
    location: "Raum München / Ebersberg / Erding",
    desc: "Planung und Ausführung von Schalungsarbeiten für Beton- und Stahlbetonbau auf anspruchsvollen Bauprojekten in Bayern.",
    anforderungen: [
      "Ausbildung als Zimmerer, Schalungsbauer oder vergleichbar",
      "Erfahrung mit Systemschalungen (z. B. PERI, Doka)",
      "Lesen von Schalungsplänen",
      "Körperliche Belastbarkeit",
    ],
    bieten: [
      "Attraktive Vergütung über Tarif",
      "Modernster Schalungspark (PERI-Systeme)",
      "Spannende Großprojekte in der Region",
      "Weiterbildungsmöglichkeiten",
    ],
  },
  {
    title: "Beton- & Stahlbetonbauer",
    type: "Vollzeit",
    location: "Raum München / Ebersberg / Erding",
    desc: "Betonarbeiten und Bewehrung auf anspruchsvollen Bauprojekten in Bayern – von Fundamenten bis hin zu komplexen Stahlbetonkonstruktionen.",
    anforderungen: [
      "Abgeschlossene Ausbildung als Beton- und Stahlbetonbauer",
      "Erfahrung in der Bewehrungsmontage",
      "Qualitätsbewusstsein und Genauigkeit",
      "Teamarbeit auf Großbaustellen",
    ],
    bieten: [
      "Übertarifliche Bezahlung",
      "Abwechslungsreiche Projekte – kein Einerlei",
      "Eigener, gepflegter Maschinenpark",
      "Familienfreundliches Arbeitsklima",
    ],
  },
  {
    title: "Kanalbauer",
    type: "Vollzeit",
    location: "Raum München / Ebersberg / Erding",
    desc: "Tiefbau, Kanal- und Wasserleitungsarbeiten für Kommunen und private Auftraggeber im Großraum München.",
    anforderungen: [
      "Ausbildung als Kanalbauer oder Tiefbauer",
      "Erfahrung im Kanal- und Leitungsbau",
      "Kenntnisse der einschlägigen DIN-Normen",
      "Führerschein Klasse B erforderlich, C/CE von Vorteil",
    ],
    bieten: [
      "Tarifgerechte, überdurchschnittliche Vergütung",
      "Kommunale und private Großprojekte",
      "Sicherer Arbeitsplatz mit langer Projektkontinuität",
      "Moderne Tiefbaugeräte und Verbausysteme",
    ],
  },
  {
    title: "Kranführer",
    type: "Vollzeit",
    location: "Raum München / Ebersberg / Erding",
    desc: "Bedienung und Wartung von Turmdreh- und Mobilkränen auf unseren Baustellen. Verantwortungsvolle Tätigkeit im Herzen des Baugeschehens.",
    anforderungen: [
      "Kranführerschein (Turmdrehkran und/oder Mobilkran)",
      "Erfahrung im Baukraneinsatz",
      "Zuverlässigkeit und Verantwortungsbewusstsein",
      "Bereitschaft zur regelmäßigen Fortbildung",
    ],
    bieten: [
      "Übertarifliche Vergütung",
      "Moderner Kranpark (Liebherr)",
      "Eigenverantwortliches Arbeiten",
      "Lange Projektlaufzeiten – kein ständiger Wechsel",
    ],
  },
  {
    title: "Baggerfahrer",
    type: "Vollzeit",
    location: "Raum München / Ebersberg / Erding",
    desc: "Erdarbeiten, Aushub und Geländegestaltung mit modernen Baggern und Erdbaumaschinen auf unseren Baustellen.",
    anforderungen: [
      "Erfahrung als Baggerfahrer / Maschinenführer",
      "Führerschein Klasse B, CE von Vorteil",
      "Sorgfältiger Umgang mit Maschinen",
      "Flexibilität und Einsatzbereitschaft",
    ],
    bieten: [
      "Attraktive Entlohnung",
      "Neuwertige Maschinen (Komatsu/Liebherr)",
      "Abwechslungsreiche Einsätze im Raum München",
      "Teamorientiertes Umfeld",
    ],
  },
  {
    title: "Schlosser / Landmaschinenmechaniker",
    type: "Vollzeit",
    location: "Werkstatt in Markt Schwaben",
    desc: "Instandhaltung und Reparatur unseres umfangreichen Maschinenparks und Fuhrparks – eine abwechslungsreiche Werkstatttätigkeit mit Eigenverantwortung.",
    anforderungen: [
      "Ausbildung als Schlosser, KFZ-Mechatroniker, Landmaschinenmechaniker oder ähnlich",
      "Erfahrung in der Diagnose und Reparatur von Baumaschinen",
      "Selbstständiges Arbeiten",
      "Führerschein Klasse B",
    ],
    bieten: [
      "Gut ausgestattete Werkstatt in Markt Schwaben",
      "Abwechslungsreiche Aufgaben an verschiedenen Maschinentypen",
      "Übertarifliche Bezahlung",
      "Direkter Kontakt zur Geschäftsführung",
    ],
  },
];

export function Karriere() {
  const [openIdx, setOpenIdx] = useState(null);

  return (
    <section
      id="stellenangebote"
      className="overflow-hidden"
      style={{ background: "linear-gradient(180deg, #0a1020 0%, #111827 100%)" }}
    >
      {/* Heading with image background */}
      <div
        className="relative px-[5%] py-16 md:py-24 lg:py-28"
        style={{
          backgroundImage: "url('/images/karriere-team-vogelperspektive.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center 40%",
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(to bottom, rgba(10,16,32,0.50) 0%, rgba(10,16,32,0.30) 40%, rgba(10,16,32,0.75) 75%, rgba(10,16,32,1) 100%)",
          }}
        />
        <div className="container relative z-10">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:items-end">
            <div>
              <p className="mb-3 font-body text-sm font-semibold uppercase tracking-[0.25em] text-white/60">
                Stellenangebote
              </p>
              <h2
                className="font-heading font-bold leading-tight tracking-tight text-white"
                style={{ fontSize: "clamp(2rem, 4vw, 4rem)" }}
              >
                Offene Stellen
              </h2>
            </div>
            <div>
              <p className="font-body text-base leading-relaxed text-white/65">
                Wir suchen laufend qualifizierte Fachkräfte, Vorarbeiter und Poliere.
                Alle Stellen sind unbefristet und mit sofortigem Einstieg möglich.
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
                className="group relative cursor-pointer"
                onClick={() => setOpenIdx(isOpen ? null : i)}
              >
                <div
                  className="relative overflow-hidden transition-all duration-300"
                  style={{
                    background: isOpen ? "rgba(196,30,58,0.06)" : "rgba(255,255,255,0.02)",
                    border: "1px solid",
                    borderColor: isOpen ? "rgba(196,30,58,0.4)" : "rgba(255,255,255,0.08)",
                    borderLeft: `3px solid ${isOpen ? "#C41E3A" : "rgba(255,255,255,0.08)"}`,
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
                      <span className="font-body text-[10px] font-semibold uppercase tracking-[0.28em] text-[#C41E3A]/70">
                        {job.type}
                      </span>
                      <span className="text-white/15">·</span>
                      <span className="font-body text-[10px] uppercase tracking-wider text-white/30">
                        {job.location}
                      </span>
                    </div>

                    <h3
                      className="mb-4 font-heading font-bold text-white transition-colors duration-200 group-hover:text-[#C41E3A]"
                      style={{ fontSize: "clamp(1.1rem, 2vw, 1.5rem)" }}
                    >
                      {job.title}
                    </h3>

                    <div className="flex items-center justify-between gap-4">
                      <p className="font-body text-xs text-white/35 leading-relaxed line-clamp-1 max-w-[260px]">
                        {job.desc.split(".")[0]}.
                      </p>
                      <div
                        className="flex-shrink-0 w-8 h-8 rounded-full border border-white/15 flex items-center justify-center text-[#C41E3A] text-lg transition-all duration-300 group-hover:border-[#C41E3A]/50"
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
                          <p className="mb-3 font-body text-[10px] font-semibold uppercase tracking-[0.25em] text-[#C41E3A]">
                            Was du mitbringst
                          </p>
                          <ul className="space-y-2">
                            {job.anforderungen.map((a) => (
                              <li key={a} className="flex items-start gap-2.5 font-body text-xs text-white/50">
                                <span className="mt-[5px] flex-shrink-0 w-[4px] h-[4px] rounded-full bg-[#C41E3A]/70" />
                                {a}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <p className="mb-3 font-body text-[10px] font-semibold uppercase tracking-[0.25em] text-[#C41E3A]">
                            Was wir bieten
                          </p>
                          <ul className="space-y-2">
                            {job.bieten.map((b) => (
                              <li key={b} className="flex items-start gap-2.5 font-body text-xs text-white/50">
                                <span className="mt-[5px] flex-shrink-0 w-[4px] h-[4px] rounded-full bg-[#C41E3A]/70" />
                                {b}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      <a
                        href="mailto:jobs@hoser-bauunternehmung.de"
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center gap-2 bg-[#C41E3A] px-5 py-2.5 font-body text-xs font-semibold uppercase tracking-[0.1em] text-white transition-opacity hover:opacity-85"
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
        <div className="border border-white/10 px-8 py-10 md:px-12">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:items-center">
            <div>
              <p className="mb-2 font-body text-xs font-semibold uppercase tracking-[0.25em] text-[#C41E3A]">
                Initiativbewerbung & Kontakt
              </p>
              <h3 className="font-heading text-2xl font-bold text-white md:text-3xl">
                Kein passendes Angebot?
              </h3>
              <p className="mt-3 font-body text-sm text-white/50 leading-relaxed">
                Wir freuen uns jederzeit über Initiativbewerbungen qualifizierter Handwerker.
                Schriftlich an:<br />
                <span className="text-white/70">Hoser Bauunternehmung GmbH · Adalbert-Stifter-Weg 29 · 85570 Markt Schwaben</span>
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <a
                href="mailto:jobs@hoser-bauunternehmung.de"
                className="inline-flex items-center gap-3 border border-white/15 px-6 py-4 font-body text-sm text-white transition-all duration-200 hover:border-[#C41E3A] hover:text-[#C41E3A]"
              >
                <span className="text-[#C41E3A] text-base">✉</span>
                jobs@hoser-bauunternehmung.de
              </a>
              <a
                href="tel:+498121471100"
                className="inline-flex items-center gap-3 border border-white/15 px-6 py-4 font-body text-sm text-white transition-all duration-200 hover:border-[#C41E3A] hover:text-[#C41E3A]"
              >
                <span className="text-[#C41E3A] text-base">☎</span>
                08121 / 47 11 0
              </a>
            </div>
          </div>
        </div>

        </div>{/* end container */}
      </div>{/* end bottom section */}
    </section>
  );
}
