"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  {
    q: "Welche Leistungen bietet Hoser Bauunternehmung an?",
    a: "Wir führen Baumeisterarbeiten im Hochbau, Erd- und Kanalbau aus. Dazu gehören Neubau, Sanierung und Umbau von Wohn-, Gewerbe- und Ingenieurbauwerken – auch mit höchstem Schwierigkeitsgrad.",
    image: "/images/craftsmen-stone-facade.jpg",
  },
  {
    q: "Wie lange sind Sie schon im Geschäft?",
    a: "Seit 1952. Gegründet von Michael Hoser als Maurerfirma mit 3 Mitarbeitern, ist das Unternehmen heute unter Claudia Hoser und Josef Lippacher bereits in der dritten Generation tätig.",
    image: "/images/villa-twilight.jpg",
  },
  {
    q: "Welche Regionen betreuen Sie?",
    a: "Unser Schwerpunkt liegt im Raum Ebersberg, Erding und München-Ost. Unser Firmensitz ist in Markt Schwaben – wir sind seit Jahrzehnten verwurzelt in dieser Region.",
    image: "/images/munich-residential.jpg",
  },
  {
    q: "Arbeiten Sie mit eigenem Personal oder Subunternehmern?",
    a: "Wir legen großen Wert auf eigenes, ausgebildetes Fachpersonal. Durch konsequente Lehrlingsausbildung sichern wir einen Personalstamm auf konstant hohem Niveau – ohne Abhängigkeit von Werklohnfirmen.",
    image: "/images/team-blueprints.jpg",
  },
  {
    q: "Können Sie auch denkmalgeschützte Gebäude sanieren?",
    a: "Ja. Wir haben langjährige Erfahrung in der Sanierung denkmalgeschützter Gebäude, Kirchen und historischer Bausubstanz – darunter mehrere Projekte für das Erzbischöfliche Ordinariat München.",
    image: "/images/interior-oak-concrete.jpg",
  },
  {
    q: "Wie nehme ich Kontakt auf?",
    a: "Rufen Sie uns an unter 08121 – 47 11 0 oder schreiben Sie uns an info@hoser-bauunternehmung.de. Wir melden uns schnellstmöglich für ein erstes Gespräch.",
    image: "/images/villa-twilight.jpg",
  },
];

const EASE = [0.76, 0, 0.24, 1];

function FaqItem({ faq, index, isOpen, onToggle, onEnter, onLeave }) {
  const num = String(index + 1).padStart(2, "0");

  return (
    <div
      className={`group relative border-b transition-colors duration-300 ${
        isOpen ? "border-hoser-gold/40" : "border-white/10"
      }`}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      {/* Gold left accent */}
      <motion.div
        className="absolute left-0 top-0 w-px bg-hoser-gold"
        style={{ height: "100%", transformOrigin: "top" }}
        animate={{ scaleY: isOpen ? 1 : 0 }}
        transition={{ duration: 0.4, ease: EASE }}
      />

      <button
        className="flex w-full items-start gap-6 py-7 text-left"
        onClick={onToggle}
      >
        {/* Ghost number */}
        <span
          className={`shrink-0 font-heading font-bold leading-none transition-colors duration-300 ${
            isOpen ? "text-hoser-gold/40" : "text-white/8 group-hover:text-white/15"
          }`}
          style={{ fontSize: "clamp(1.8rem, 2.8vw, 2.8rem)", lineHeight: 1 }}
        >
          {num}
        </span>

        {/* Question */}
        <span
          className={`flex-1 font-heading text-base font-bold leading-snug tracking-tight transition-colors duration-300 md:text-lg lg:text-xl ${
            isOpen ? "text-white" : "text-white/65 group-hover:text-white"
          }`}
        >
          {faq.q}
        </span>

        {/* Toggle */}
        <span
          className={`mt-1 shrink-0 font-light leading-none transition-all duration-300 ${
            isOpen ? "rotate-45 text-hoser-gold" : "text-white/35 group-hover:text-hoser-gold"
          }`}
          style={{ fontSize: "1.5rem" }}
        >
          +
        </span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.45, ease: EASE }}
            style={{ overflow: "hidden" }}
          >
            <p className="pb-7 pl-[calc(clamp(1.8rem,2.8vw,2.8rem)+1.5rem)] font-body text-sm leading-relaxed text-white/55 md:text-base">
              {faq.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Faq14() {
  const [openIdx, setOpenIdx] = useState(null);
  const [hoverIdx, setHoverIdx] = useState(null);

  const toggle = (i) => setOpenIdx((prev) => (prev === i ? null : i));
  const activeIdx = hoverIdx ?? openIdx ?? 0;

  return (
    <section
      className="relative overflow-hidden"
      style={{ background: "linear-gradient(160deg, #040D1C 0%, #071428 60%, #050F22 100%)" }}
    >
      <div className="grid lg:grid-cols-[1fr_1.15fr]">

        {/* ── Left: Sticky image panel ── */}
        <div className="relative hidden overflow-hidden lg:sticky lg:top-0 lg:block lg:h-screen">

          {/* All images stacked, crossfade via opacity */}
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              className="absolute inset-0"
              animate={{ opacity: activeIdx === i ? 1 : 0 }}
              transition={{ duration: 0.65, ease: EASE }}
            >
              <motion.img
                src={faq.image}
                alt={faq.q}
                className="absolute inset-0 h-full w-full object-cover"
                animate={{ scale: activeIdx === i ? 1.04 : 1 }}
                transition={{ duration: 6, ease: "easeOut" }}
              />
            </motion.div>
          ))}

          {/* Overlays */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#040D1C]/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#040D1C]/85 via-transparent to-[#040D1C]/30" />

          {/* Subtle grid */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",
              backgroundSize: "80px 80px",
            }}
          />

          {/* Content overlay */}
          <div className="absolute inset-0 flex flex-col justify-between p-12">
            {/* Top */}
            <p className="font-body text-xs font-semibold uppercase tracking-[0.3em] text-hoser-gold/80">
              Hoser Bauunternehmung
            </p>

            {/* Bottom */}
            <div>
              <p className="mb-4 font-body text-sm font-semibold uppercase tracking-[0.25em] text-hoser-gold">
                FAQ
              </p>
              <h2
                className="font-heading font-bold leading-[1.05] tracking-tight text-white"
                style={{ fontSize: "clamp(2.6rem, 4vw, 4.8rem)" }}
              >
                Häufige<br />Fragen
              </h2>
              <div className="mt-6 h-px w-10 bg-hoser-gold/50" />
              <p className="mt-5 font-body text-sm leading-relaxed text-white/45">
                Antworten auf das, was beim<br />Bauen in Bayern am meisten zählt.
              </p>

              {/* Active counter */}
              <div className="mt-10 flex items-center gap-3">
                <motion.span
                  key={activeIdx}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="font-heading text-2xl font-bold tabular-nums text-white"
                >
                  {String(activeIdx + 1).padStart(2, "0")}
                </motion.span>
                <span className="font-body text-sm text-white/30">/ {String(faqs.length).padStart(2, "0")}</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Right: Accordion ── */}
        <div
          className="px-[5%] py-16 md:py-24 lg:px-14 lg:py-28"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.018) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.018) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        >
          {/* Mobile heading */}
          <div className="mb-12 lg:hidden">
            <p className="mb-4 font-body text-sm font-semibold uppercase tracking-[0.25em] text-hoser-gold">
              FAQ
            </p>
            <h2
              className="mb-5 font-heading font-bold leading-[1.05] tracking-tight text-white"
              style={{ fontSize: "clamp(2.4rem, 8vw, 4rem)" }}
            >
              Häufige<br />Fragen
            </h2>
            <div className="h-px w-10 bg-hoser-gold/50" />
          </div>

          {/* Items */}
          <div>
            {faqs.map((faq, i) => (
              <FaqItem
                key={faq.q}
                faq={faq}
                index={i}
                isOpen={openIdx === i}
                onToggle={() => toggle(i)}
                onEnter={() => setHoverIdx(i)}
                onLeave={() => setHoverIdx(null)}
              />
            ))}
          </div>

          {/* CTA */}
          <div className="mt-14">
            <p className="mb-5 font-body text-sm text-white/40">
              Noch weitere Fragen?
            </p>
            <a
              href="/kontakt"
              className="inline-flex items-center gap-3 border border-white/20 px-7 py-3.5 font-body text-sm font-semibold tracking-wide text-white/70 transition-all duration-200 hover:border-hoser-gold hover:text-hoser-gold"
            >
              Fragen Sie uns
              <span>→</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
