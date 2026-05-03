"use client";

import React from "react";

export function VideoAbout() {
  return (
    <section className="bg-[#f0f0ef] px-[5%] py-16 md:py-24">
      <div className="container max-w-3xl mx-auto">

        {/* Text above */}
        <div className="mb-8 md:mb-10">
          <p className="mb-3 font-body text-sm font-semibold uppercase tracking-[0.25em] text-hoser-gold">
            1952 bis heute
          </p>
          <h2
            className="font-heading font-bold text-text-primary leading-tight"
            style={{ fontSize: "clamp(2rem, 4vw, 3rem)", color: "#0a1020" }}
          >
            Drei Generationen. Eine Überzeugung.
          </h2>
        </div>

        {/* Video */}
        <div className="overflow-hidden">
          <video
            src="/videos/video7.mp4"
            autoPlay
            muted
            playsInline
            className="w-full object-cover"
          />
        </div>

        {/* Text below */}
        <p className="mt-6 font-body text-base leading-relaxed text-[#0a1020]/60 md:text-lg max-w-xl">
          Was Michael Hoser 1952 mit drei Mitarbeitern begann, tragen heute
          über 60 Fachkräfte weiter. Die Werte haben sich nicht verändert –
          nur die Möglichkeiten, sie umzusetzen.
        </p>

      </div>
    </section>
  );
}
