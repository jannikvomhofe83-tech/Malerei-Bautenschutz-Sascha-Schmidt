"use client";

import React from "react";
import { BiEnvelope, BiMap, BiPhone } from "react-icons/bi";

export function Contact14() {
  return (
    <section className="bg-background-primary px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="mb-12 max-w-lg md:mb-18 lg:mb-20">
          <p className="mb-4 font-body text-sm font-semibold uppercase tracking-[0.25em] text-hoser-gold">
            Kontakt
          </p>
          <h2 className="mb-5 font-heading text-4xl font-bold leading-tight tracking-tight text-text-primary md:text-5xl lg:text-6xl">
            Sprechen Sie mit uns.
          </h2>
          <p className="font-body text-base leading-relaxed text-text-secondary md:text-lg">
            Wir sind Ihr direkter Ansprechpartner für alle Fragen rund um Ihr Bauvorhaben –
            von der ersten Idee bis zur Fertigstellung.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-x-12 gap-y-12 md:grid-cols-[1fr_1.4fr] md:gap-x-20">
          <div className="grid grid-cols-1 gap-y-10">
            <div>
              <div className="mb-3 text-hoser-gold md:mb-4">
                <BiPhone className="size-7" />
              </div>
              <h3 className="mb-1 font-heading text-lg font-bold text-text-primary">
                Telefon
              </h3>
              <p className="mb-2 font-body text-sm text-text-secondary">
                Mo – Fr, 8:00 – 17:00 Uhr
              </p>
              <a
                className="font-body text-base font-semibold text-text-primary transition-colors duration-200 hover:text-hoser-gold"
                href="tel:+4981214711 0"
              >
                08121 – 47 11 0
              </a>
            </div>

            <div>
              <div className="mb-3 text-hoser-gold md:mb-4">
                <BiEnvelope className="size-7" />
              </div>
              <h3 className="mb-1 font-heading text-lg font-bold text-text-primary">
                E-Mail
              </h3>
              <p className="mb-2 font-body text-sm text-text-secondary">
                Projektanfragen und allgemeine Fragen
              </p>
              <a
                className="font-body text-base font-semibold text-text-primary transition-colors duration-200 hover:text-hoser-gold"
                href="mailto:info@hoser-bauunternehmung.de"
              >
                info@hoser-bauunternehmung.de
              </a>
            </div>

            <div>
              <div className="mb-3 text-hoser-gold md:mb-4">
                <BiMap className="size-7" />
              </div>
              <h3 className="mb-1 font-heading text-lg font-bold text-text-primary">
                Standort
              </h3>
              <p className="font-body text-base text-text-secondary">
                Markt Schwaben<br />
                Landkreis Ebersberg, Bayern
              </p>
            </div>
          </div>

          <div className="overflow-hidden">
            <img
              src="/images/villa-twilight.jpg"
              alt="Hoser Bauunternehmung Markt Schwaben"
              className="h-[400px] w-full object-cover md:h-[500px]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
