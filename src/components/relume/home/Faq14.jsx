"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { gsap } from "../../../utils/gsap";

const faqs = [
  {
    q: "Welche Leistungen bietet Malerei & Bautenschutz Sascha Schmidt an?",
    a: "Wir bieten Malerei, Farbgestaltung und Beratung, fachgerechte Schimmelsanierung, Holzschutz, Spachtelarbeiten (Q1–Q4), Verputzen, Tapezieren, Lackieren, Streicharbeiten aller Art, Airless-Spritzverfahren, Bodenverlegung, Parkettschleifen, Betonsanierung und hochwertige Beschichtungen an — alles aus einer Hand.",
  },
  {
    q: "Wie lange sind Sie schon im Geschäft?",
    a: "Sascha Schmidt ist seit 20 Jahren im Bauhandwerk als Maler und Lackierer tätig. In dieser Zeit haben wir umfassendes Fachwissen aufgebaut, um die individuellen Anforderungen unserer Kunden zu erfüllen.",
  },
  {
    q: "Welche Regionen betreuen Sie?",
    a: "Unser Schwerpunkt liegt in Mühldorf am Inn und Umgebung. Wir sind Ihr kompetenter Partner für professionelle Maler- und Bautenschutzarbeiten in der Region.",
  },
  {
    q: "Was ist eine Schimmelsanierung und wann brauche ich sie?",
    a: "Bei nassen Wänden, Rissen im Mauerwerk oder Schimmel in Wohnräumen bieten wir fachgerechte Schimmelsanierung an. Wir treffen Maßnahmen an Bauwerken, um sie vor schädlichen Einwirkungen zu schützen — im Innen- und Außenbereich.",
  },
  {
    q: "Was bedeuten Spachtelarbeiten Q1 bis Q4?",
    a: "Die Qualitätsstufen Q1 bis Q4 beschreiben den Grad der Oberflächenglätte bei Spachtelarbeiten. Q1 ist die einfachste Stufe für verdeckte Bereiche, Q4 die hochwertigste für stark streiflichtbelastete Flächen — wir führen alle Qualitätsstufen fachgerecht aus.",
  },
  {
    q: "Wie nehme ich Kontakt auf?",
    a: "Rufen Sie uns an unter 01520 7827485 (Mo–Fr 07:00–18:00, Sa 07:00–12:00) oder besuchen Sie uns: Am Industriepark 10, 84453 Mühldorf am Inn. Wir beraten Sie gerne unverbindlich.",
  },
];

const EASE = [0.76, 0, 0.24, 1];

export function Faq14() {
  const [openIdx, setOpenIdx] = useState(null);
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const ghostY = useTransform(scrollYProgress, [0, 1], ["0%", "-12%"]);

  const toggle = (i) => setOpenIdx((prev) => (prev === i ? null : i));

  useEffect(() => {
    const scope = sectionRef.current;
    if (!scope) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: scope, start: "top 72%", once: true },
        defaults: { ease: "power3.out" },
      });

      // Eyebrow line + label
      tl.fromTo(".faq-eyebrow-line",
        { scaleX: 0, transformOrigin: "left center" },
        { scaleX: 1, duration: 0.6 },
        0
      );
      tl.fromTo(".faq-eyebrow-label",
        { y: 14, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5 },
        0.15
      );

      // Headline lines — mask reveal
      tl.fromTo(".faq-headline-inner",
        { y: "108%" },
        { y: "0%", stagger: 0.12, duration: 0.9 },
        0.25
      );

      // Counter block
      tl.fromTo(".faq-counter",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.55 },
        0.55
      );

      // Progress bar track
      tl.fromTo(".faq-track",
        { scaleX: 0, transformOrigin: "left center" },
        { scaleX: 1, duration: 0.7, ease: "power2.inOut" },
        0.6
      );

      // FAQ rows staggered
      tl.fromTo(".faq-row",
        { y: 28, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.08, duration: 0.55 },
        0.75
      );

      // CTA
      tl.fromTo(".faq-cta",
        { y: 18, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5 },
        1.35
      );
    }, scope);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{ backgroundColor: "#FAFAFA" }}
    >

      {/* Ghost heading — parallax */}
      <motion.div
        style={{ y: ghostY }}
        className="pointer-events-none absolute inset-x-0 top-0 flex items-start justify-center overflow-hidden select-none"
        aria-hidden="true"
      >
        <span
          className="font-heading font-bold leading-none text-[#B8935A]"
          style={{
            fontSize: "clamp(8rem, 22vw, 26rem)",
            opacity: 0.045,
            letterSpacing: "-0.04em",
            lineHeight: 0.85,
          }}
        >
          FAQ
        </span>
      </motion.div>

      <div className="relative container px-[5%] py-20 md:py-28 lg:py-36">

        {/* Header */}
        <div className="mb-16 md:mb-20 grid grid-cols-1 gap-6 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <div className="mb-5 flex items-center gap-4">
              <div className="faq-eyebrow-line h-px w-8 bg-[#B8935A]" />
              <p className="faq-eyebrow-label font-body text-xs font-semibold uppercase tracking-[0.32em] text-[#B8935A]">
                Häufige Fragen
              </p>
            </div>
            <h2
              className="font-heading font-bold leading-[1.02] tracking-tight text-[#141414]"
              style={{ fontSize: "clamp(2.8rem, 6vw, 6rem)" }}
            >
              <span className="block" style={{ overflow: "hidden", paddingBottom: "0.05em" }}>
                <span className="faq-headline-inner block">Was Sie wissen</span>
              </span>
              <span className="block" style={{ overflow: "hidden", paddingBottom: "0.05em" }}>
                <em className="faq-headline-inner not-italic text-[#B8935A]/35 block">wollen.</em>
              </span>
            </h2>
          </div>

          {/* Counter */}
          <div className="faq-counter hidden md:flex flex-col items-end gap-1 pb-2">
            <AnimatePresence mode="wait">
              <motion.span
                key={openIdx ?? "none"}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
                className="font-heading text-5xl font-bold tabular-nums text-[#B8935A]/15"
              >
                {openIdx !== null ? String(openIdx + 1).padStart(2, "0") : "—"}
              </motion.span>
            </AnimatePresence>
            <span className="font-body text-xs text-[#6B6B6B] tracking-widest">
              / {String(faqs.length).padStart(2, "0")}
            </span>
          </div>
        </div>

        {/* Progress bar */}
        <div className="faq-track mb-0 h-px w-full bg-[#B8935A]/10" />
        <motion.div
          className="mb-0 h-px bg-[#B8935A] origin-left"
          animate={{
            scaleX: openIdx !== null ? (openIdx + 1) / faqs.length : 0,
          }}
          transition={{ duration: 0.5, ease: EASE }}
        />

        {/* Accordion */}
        <div>
          {faqs.map((faq, i) => {
            const isOpen = openIdx === i;
            const num = String(i + 1).padStart(2, "0");

            return (
              <div key={faq.q} className="faq-row relative">
                <button
                  onClick={() => toggle(i)}
                  className="group relative flex w-full items-start gap-5 py-7 md:gap-8 md:py-8 text-left"
                  aria-expanded={isOpen}
                >
                  {/* Number */}
                  <span
                    className="shrink-0 font-heading font-bold tabular-nums transition-colors duration-300"
                    style={{
                      fontSize: "clamp(0.7rem, 1.2vw, 0.85rem)",
                      letterSpacing: "0.1em",
                      color: isOpen ? "#B8935A" : "rgba(20,20,20,0.32)",
                      paddingTop: "0.35em",
                    }}
                  >
                    {num}
                  </span>

                  {/* Question */}
                  <span
                    className="flex-1 font-heading font-bold leading-snug tracking-tight transition-colors duration-300"
                    style={{
                      fontSize: "clamp(1.05rem, 2vw, 1.45rem)",
                      color: isOpen ? "#141414" : "rgba(20,20,20,0.62)",
                    }}
                  >
                    {faq.q}
                  </span>

                  {/* Toggle icon */}
                  <div className="relative shrink-0 mt-1 flex h-7 w-7 items-center justify-center">
                    <span
                      className="absolute block h-px w-3.5 transition-colors duration-300"
                      style={{ background: isOpen ? "#B8935A" : "rgba(20,20,20,0.35)" }}
                    />
                    <motion.span
                      className="absolute block h-px w-3.5"
                      animate={{ rotate: isOpen ? 90 : 0, opacity: isOpen ? 0 : 1 }}
                      transition={{ duration: 0.3, ease: EASE }}
                      style={{
                        rotate: "90deg",
                        background: isOpen ? "#B8935A" : "rgba(20,20,20,0.35)",
                      }}
                    />
                  </div>
                </button>

                {/* Answer */}
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
                      <div className="flex gap-5 md:gap-8 pb-8">
                        {/* Blue left accent */}
                        <div className="shrink-0" style={{ width: "clamp(0.7rem, 1.2vw, 0.85rem)" }}>
                          <div className="h-full w-px bg-[#B8935A]/50 ml-auto" />
                        </div>
                        <p className="font-body text-sm leading-relaxed text-[#6B6B6B] md:text-base max-w-2xl">
                          {faq.a}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Separator */}
                <div
                  className="h-px w-full transition-colors duration-300"
                  style={{ background: isOpen ? "rgba(184,147,90,0.18)" : "rgba(184,147,90,0.08)" }}
                />
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="faq-cta mt-16 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-body text-sm text-[#6B6B6B]">
            Noch weitere Fragen? Wir sind persönlich für Sie da.
          </p>
          <a
            href="/kontakt"
            className="group inline-flex items-center gap-4 border border-[#B8935A]/30 px-8 py-4 font-body text-sm font-semibold tracking-widest text-[#B8935A] uppercase transition-all duration-300 hover:bg-[#B8935A] hover:text-white"
          >
            Kontakt aufnehmen
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </a>
        </div>

      </div>
    </section>
  );
}
