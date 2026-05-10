"use client";

import React from "react";
import { BiEnvelope, BiMap, BiPhone } from "react-icons/bi";

export function Contact14() {
  return (
    <section className="px-[5%] pt-10 pb-16 md:pt-14 md:pb-24" style={{ backgroundColor: "#FAFAFA" }}>
      <div className="container">

        {/* Top row: text left, map right */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16 mb-14 md:mb-20">

          {/* Left: heading + description */}
          <div className="flex flex-col justify-center">
            <p className="mb-4 font-body text-sm font-semibold uppercase tracking-[0.25em] text-[#B8935A]">
              Kontakt
            </p>
            <h2
              className="mb-5 font-heading font-bold leading-tight tracking-tight text-[#141414]"
              style={{ fontSize: "clamp(2rem, 4vw, 4rem)" }}
            >
              Sprechen Sie mit uns.
            </h2>
            <p className="font-body text-base leading-relaxed text-[#141414]/60 md:text-lg">
              Wir sind Ihr direkter Ansprechpartner für alle Fragen rund um Malerei und Bautenschutz –
              von der ersten Beratung bis zum perfekten Ergebnis.
            </p>
          </div>

          {/* Right: Google Maps */}
          <div className="overflow-hidden rounded-sm" style={{ minHeight: 280 }}>
            <iframe
              title="Malerei & Bautenschutz Sascha Schmidt Standort"
              src="https://maps.google.com/maps?q=Am+Industriepark+10%2C+84453+M%C3%BChldorf+am+Inn&t=&z=15&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: 280 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>

        {/* Bottom row: contact info */}
        <div className="grid grid-cols-1 gap-y-10 md:grid-cols-3 md:gap-x-16">
          <div>
            <div className="mb-3 text-[#B8935A] md:mb-4">
              <BiPhone className="size-6" />
            </div>
            <h3 className="mb-1 font-heading text-base font-bold text-[#141414]">
              Telefon
            </h3>
            <p className="mb-2 font-body text-sm text-[#141414]/50">
              Mo – Fr 07:00–18:00 · Sa 07:00–12:00
            </p>
            <a
              className="font-body text-base font-semibold text-[#141414] transition-colors duration-200 hover:text-[#B8935A]"
              href="tel:+4915207827485"
            >
              01520 7827485
            </a>
          </div>

          <div>
            <div className="mb-3 text-[#B8935A] md:mb-4">
              <BiEnvelope className="size-6" />
            </div>
            <h3 className="mb-1 font-heading text-base font-bold text-[#141414]">
              Öffnungszeiten
            </h3>
            <div className="font-body text-sm text-[#141414]/60 space-y-0.5">
              <p>Mo – Fr &nbsp;&nbsp;07:00 – 18:00 Uhr</p>
              <p>Samstag &nbsp;07:00 – 12:00 Uhr</p>
              <p>Sonntag &nbsp;Geschlossen</p>
            </div>
          </div>

          <div>
            <div className="mb-3 text-[#B8935A] md:mb-4">
              <BiMap className="size-6" />
            </div>
            <h3 className="mb-1 font-heading text-base font-bold text-[#141414]">
              Standort
            </h3>
            <p className="font-body text-base text-[#141414]/60">
              Am Industriepark 10<br />
              84453 Mühldorf am Inn
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
