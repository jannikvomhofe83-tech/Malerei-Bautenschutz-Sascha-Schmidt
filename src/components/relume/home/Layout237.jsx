"use client";

import React from "react";

const features = [
  {
    title: "Handwerk als Berufung",
    body: "Gegründet 1952 von Michael Hoser als Maurerfirma mit drei Mitarbeitern. Heute führen wir das Unternehmen in der dritten Generation – mit denselben Werten, aber modernster Technik und eigenem, ausgebildetem Fachpersonal.",
    image: "/images/craftsmen-stone-facade.jpg",
  },
  {
    title: "Verlässlichkeit",
    body: "Klare Angebote, transparente Zeitpläne, direkte Kommunikation. Wir koordinieren Architekten, Ingenieure und Fachgewerke – Sie haben einen Ansprechpartner von der ersten Besprechung bis zur Schlüsselübergabe.",
    image: "/images/team-blueprints.jpg",
  },
  {
    title: "Verwurzelt in der Region",
    body: "Markt Schwaben ist unser Zuhause. Seit über 70 Jahren bauen wir im Raum Ebersberg, Erding und München-Ost. Wir kennen die lokalen Behörden, Genehmigungsverfahren und die Anforderungen dieser Region.",
    image: "/images/munich-residential.jpg",
  },
];

export function Layout237() {
  return (
    <section className="bg-background-primary px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">

        {/* Heading */}
        <div className="mb-14 max-w-2xl md:mb-18">
          <p className="mb-4 font-body text-sm font-semibold uppercase tracking-[0.25em] text-hoser-gold">
            Unsere Philosophie
          </p>
          <h2
            className="font-heading font-bold leading-[1.05] tracking-tight text-text-primary"
            style={{ fontSize: "clamp(2.4rem, 4.5vw, 4.5rem)" }}
          >
            Wie wir denken.<br />
            <em className="font-serif font-light not-italic text-text-secondary">Wie wir bauen.</em>
          </h2>
        </div>

        {/* Cards */}
        <div className="flex flex-col gap-3">
          {features.map((f, i) => {
            const isEven = i % 2 === 0;
            const num = String(i + 1).padStart(2, "0");

            return (
              <div
                key={f.title}
                className="group relative overflow-hidden"
                style={{ height: "clamp(280px, 48vh, 520px)" }}
              >
                {/* Image */}
                <img
                  src={f.image}
                  alt={f.title}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.03]"
                />

                {/* Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-black/10" />
                <div className={`absolute inset-0 bg-gradient-to-r ${isEven ? "from-black/50 to-transparent" : "from-transparent to-black/50"}`} />

                {/* Ghost number */}
                <div
                  className="pointer-events-none absolute top-4 font-heading font-bold leading-none text-white/6 select-none"
                  style={{
                    fontSize: "clamp(5rem, 14vw, 12rem)",
                    right: isEven ? "auto" : "2rem",
                    left: isEven ? "2rem" : "auto",
                  }}
                  aria-hidden="true"
                >
                  {num}
                </div>

                {/* Content */}
                <div
                  className={`absolute bottom-0 ${isEven ? "left-0" : "right-0"} p-8 md:p-12 max-w-xl`}
                >
                  <div className="mb-4 h-px w-8 bg-hoser-gold" />
                  <h3
                    className="mb-3 font-heading font-bold leading-tight tracking-tight text-white"
                    style={{ fontSize: "clamp(1.5rem, 2.8vw, 2.4rem)" }}
                  >
                    {f.title}
                  </h3>
                  <p className="font-body text-sm leading-relaxed text-white/65 md:text-base">
                    {f.body}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTAs */}
        <div className="mt-12 flex flex-wrap items-center gap-6 md:mt-16">
          <a
            href="/leistungen"
            className="inline-flex items-center bg-hoser-gold px-8 py-4 font-body text-sm font-semibold uppercase tracking-[0.1em] text-white transition-opacity duration-200 hover:opacity-85"
          >
            Leistungen entdecken
          </a>
          <a
            href="/ueber-uns"
            className="inline-flex items-center gap-3 font-body text-sm font-semibold uppercase tracking-[0.1em] text-text-secondary transition-colors duration-200 hover:text-text-primary"
          >
            Unsere Geschichte
            <span className="text-hoser-gold">→</span>
          </a>
        </div>

      </div>
    </section>
  );
}
