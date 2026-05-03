"use client";

import React from "react";

const team = [
  { name: "Claudia Hoser", role: "Geschäftsführerin", img: "https://i.pravatar.cc/300?img=47" },
  { name: "Josef Lippacher", role: "Geschäftsführer", img: "https://i.pravatar.cc/300?img=11" },
  { name: "Martin Bauer", role: "Bauleiter", img: "https://i.pravatar.cc/300?img=12" },
  { name: "Stefan Huber", role: "Polier", img: "https://i.pravatar.cc/300?img=13" },
  { name: "Andreas Maier", role: "Polier", img: "https://i.pravatar.cc/300?img=14" },
  { name: "Thomas Schneider", role: "Maurermeister", img: "https://i.pravatar.cc/300?img=15" },
  { name: "Michael Wagner", role: "Beton- & Stahlbetonbauer", img: "https://i.pravatar.cc/300?img=16" },
  { name: "Klaus Fischer", role: "Kanalbauer", img: "https://i.pravatar.cc/300?img=17" },
  { name: "Sebastian Müller", role: "Kranführer", img: "https://i.pravatar.cc/300?img=18" },
  { name: "Florian Zimmermann", role: "Baggerfahrer", img: "https://i.pravatar.cc/300?img=19" },
  { name: "Peter Hofmann", role: "Schalungszimmerer", img: "https://i.pravatar.cc/300?img=20" },
  { name: "Hans Berger", role: "Maschinenführer", img: "https://i.pravatar.cc/300?img=21" },
  { name: "Eva Keller", role: "Buchhaltung", img: "https://i.pravatar.cc/300?img=48" },
  { name: "Sandra Richter", role: "Projektassistenz", img: "https://i.pravatar.cc/300?img=49" },
  { name: "Christian Wolf", role: "Azubi – Maurer", img: "https://i.pravatar.cc/300?img=22" },
];

export function Team() {
  return (
    <section className="bg-[#111827] px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">

        {/* Heading */}
        <div className="mb-14 md:mb-18">
          <p className="mb-3 font-body text-sm font-semibold uppercase tracking-[0.25em] text-[#C41E3A]">
            Menschen bei Hoser
          </p>
          <h2
            className="font-heading font-bold leading-tight tracking-tight text-white"
            style={{ fontSize: "clamp(2rem, 4vw, 4rem)" }}
          >
            Unser Team
          </h2>
          <p className="mt-4 max-w-xl font-body text-base text-white/60">
            Eigenes, ausgebildetes Fachpersonal – kein Rückgriff auf Werklohnfirmen.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {team.map((member) => (
            <div key={member.name} className="group flex flex-col items-center text-center">
              {/* Photo */}
              <div className="relative mb-4 overflow-hidden w-full aspect-square rounded-2xl">
                <img
                  src={member.img}
                  alt={member.name}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                {/* Gold bottom line on hover */}
                <div className="absolute bottom-0 left-0 h-[3px] w-0 bg-[#C41E3A] transition-all duration-500 group-hover:w-full" />
              </div>

              {/* Info */}
              <h3 className="font-heading text-sm font-bold text-white md:text-base">
                {member.name}
              </h3>
              <p className="mt-1 font-body text-xs text-[#C41E3A]/80">
                {member.role}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
