"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const milestones = [
  {
    year: "Beginn",
    title: "Der Einstieg ins Handwerk",
    desc: "Sascha Schmidt beginnt seine Ausbildung als Maler und Lackierer – aus Leidenschaft für das Handwerk und dem Wunsch, hochwertige Arbeit zu leisten.",
    detail: "Von Anfang an stehen Qualität, Verlässlichkeit und persönliche Betreuung im Mittelpunkt – Werte, die das Unternehmen bis heute prägen.",
  },
  {
    year: "Gründung",
    title: "Malerei & Bautenschutz Sascha Schmidt",
    desc: "Sascha Schmidt gründet seinen eigenen Betrieb in Mühldorf am Inn. Von Anfang an das volle Leistungsspektrum: Malerei, Bautenschutz, Sanierung und mehr.",
    detail: "Kundenzufriedenheit steht dabei an erster Stelle. Jeder Auftrag wird mit persönlichem Einsatz und höchster Sorgfalt abgewickelt.",
  },
  {
    year: "Wachstum",
    title: "Erweiterung der Leistungen",
    desc: "Das Angebot wächst stetig: Bodenverlegung, Parkettschleifen, Betonsanierung und hochwertige Beschichtungen kommen zum Portfolio hinzu.",
    detail: "Ausschließlich Produkte renommierter Hersteller in Profiqualität – für langfristigen Schutz und ästhetisch ansprechende Ergebnisse.",
  },
  {
    year: "Heute",
    title: "20+ Jahre Erfahrung",
    desc: "Über 20 Jahre Erfahrung im Bauhandwerk. Malerei & Bautenschutz Sascha Schmidt steht für Handwerksqualität auf höchstem Niveau in Mühldorf am Inn.",
    detail: "Von Malerei und Schimmelsanierung bis hin zu Bodenverlegung und Betonsanierung – weit bekannt und mit höchster Kundenzufriedenheit.",
  },
];

const splitWords = (el, text) => {
  el.innerHTML = "";
  return text.split(" ").map((word, i, arr) => {
    const wrap = document.createElement("span");
    wrap.style.display = "inline-block";
    wrap.style.overflow = "hidden";
    wrap.style.paddingBottom = "0.08em";
    if (i < arr.length - 1) wrap.style.marginRight = "0.28em";
    const inner = document.createElement("span");
    inner.style.display = "inline-block";
    inner.style.willChange = "transform";
    inner.textContent = word;
    wrap.appendChild(inner);
    el.appendChild(wrap);
    return inner;
  });
};

export function Geschichte() {
  const sectionRef = useRef(null);
  const eyebrowRef = useRef(null);
  const headingRef = useRef(null);
  const subRef     = useRef(null);
  const timelineRef = useRef(null);
  const lineRef = useRef(null);
  const dotRefs = useRef([]);
  const cardRefs = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {

      // ── Heading intro: eyebrow + word-reveal heading + subtitle ────────
      gsap.set(eyebrowRef.current, { y: 22, opacity: 0 });
      const headingWords = headingRef.current
        ? splitWords(headingRef.current, "Unsere Geschichte")
        : [];
      gsap.set(headingWords, { yPercent: 110 });
      gsap.set(subRef.current, { y: 22, opacity: 0 });

      gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
        defaults: { force3D: true },
      })
        .to(eyebrowRef.current, { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" })
        .to(headingWords, { yPercent: 0, duration: 1.0, ease: "expo.out", stagger: 0.07 }, "-=0.35")
        .to(subRef.current, { y: 0, opacity: 1, duration: 0.7, ease: "power3.out" }, "-=0.5");

      // Gold thread grows from top to bottom as timeline scrolls into view
      gsap.fromTo(
        lineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          transformOrigin: "top center",
          ease: "none",
          scrollTrigger: {
            trigger: timelineRef.current,
            start: "top 75%",
            end: "bottom 75%",
            scrub: 1.2,
          },
        }
      );

      // Each dot pops in when the line reaches it
      dotRefs.current.forEach((dot) => {
        if (!dot) return;
        gsap.fromTo(
          dot,
          { scale: 0, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.5,
            ease: "back.out(2.5)",
            scrollTrigger: {
              trigger: dot,
              start: "top 72%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      // Each milestone card slides in from the right
      cardRefs.current.forEach((card) => {
        if (!card) return;
        gsap.fromTo(
          card,
          { opacity: 0, x: 60 },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="overflow-hidden" style={{ backgroundColor: "#FAFAFA" }}>

      {/* Top third — image background with heading */}
      <div
        className="relative px-[5%] py-16 md:py-24 lg:py-28"
        style={{
          backgroundImage: "url('/images/geschichte-mauerwerk.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center 40%",
        }}
      >
        {/* Overlay so text stays readable */}
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(to bottom, rgba(240,240,239,0.82) 0%, rgba(240,240,239,0.92) 60%, rgba(240,240,239,1) 100%)",
          }}
        />

        <div className="container relative z-10">
          <div className="max-w-2xl">
            <p ref={eyebrowRef} className="mb-3 font-body text-sm font-semibold uppercase tracking-[0.25em] text-[#B8935A]">
              Seit 20 Jahren
            </p>
            <h2
              ref={headingRef}
              className="mb-5 font-heading font-bold leading-tight tracking-tight text-[#141414]"
              style={{ fontSize: "clamp(2rem, 4vw, 4rem)" }}
            >
              Unsere Geschichte
            </h2>
            <p ref={subRef} className="font-body text-base leading-relaxed text-[#141414]/55">
              Handwerksbetrieb in Mühldorf am Inn.<br />Ein Anspruch: Qualität, die langfristig schützt und begeistert.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom two thirds — timeline on plain background */}
      <div className="px-[5%] pb-16 md:pb-24 lg:pb-28">
        <div className="container">

          {/* Timeline */}
        <div ref={timelineRef} className="relative">

          {/* Red thread — full height, grows with scroll */}
          <div
            className="absolute top-0 bottom-0"
            style={{
              left: "18px",
              width: "12px",
              background: "linear-gradient(to right, rgba(184,147,90,0.18) 0%, #DDDED8 30%, #E5E4DC 50%, #DDDED8 70%, rgba(184,147,90,0.12) 100%)",
              borderRadius: "6px",
            }}
          >
            <div
              ref={lineRef}
              className="absolute inset-0 origin-top"
              style={{
                borderRadius: "6px",
                background: "linear-gradient(to right, rgba(13,13,13,0.8) 0%, #B8935A 25%, #2C4F9D 50%, #B8935A 75%, rgba(13,13,13,0.8) 100%)",
                boxShadow: "2px 0 8px rgba(184,147,90,0.45), -1px 0 4px rgba(0,0,0,0.15)",
                transform: "scaleY(0)",
              }}
            />
          </div>

          {/* Milestones */}
          <div>
            {milestones.map((m, i) => (
              <div
                key={m.year}
                className="relative grid grid-cols-[48px_1fr] pb-20 last:pb-0"
              >
                {/* Dot on the thread — 3D sphere */}
                <div className="flex justify-center pt-2 z-10">
                  <div
                    ref={(el) => (dotRefs.current[i] = el)}
                    className="flex-shrink-0"
                    style={{
                      width: "22px",
                      height: "22px",
                      borderRadius: "50%",
                      background: "radial-gradient(circle at 35% 32%, #5C7BD3, #B8935A 48%, #0D0D0D 100%)",
                      boxShadow: "0 0 0 3px #f0f0ef, 0 0 0 5px rgba(184,147,90,0.5), 2px 3px 8px rgba(0,0,0,0.3)",
                      opacity: 0,
                      transform: "scale(0)",
                    }}
                  />
                </div>

                {/* Milestone content */}
                <div
                  ref={(el) => (cardRefs.current[i] = el)}
                  className="relative pl-8 md:pl-12 overflow-hidden"
                  style={{ opacity: 0 }}
                >
                  {/* Ghost year — decorative background */}
                  <span
                    className="pointer-events-none select-none absolute right-0 top-1/2 -translate-y-1/2 font-heading font-bold leading-none text-[#141414]/[0.045]"
                    style={{ fontSize: "clamp(6rem, 14vw, 13rem)" }}
                  >
                    {m.year}
                  </span>

                  {/* Step number */}
                  <span className="mb-4 block font-body text-[10px] font-semibold uppercase tracking-[0.35em] text-[#B8935A]">
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  <h3 className="mb-4 font-heading text-2xl font-bold text-[#141414] md:text-3xl lg:text-4xl">
                    {m.title}
                  </h3>

                  {/* Gold divider */}
                  <div className="mb-5 h-px w-10" style={{ backgroundColor: "#B8935A" }} />

                  <p className="mb-3 font-body text-base leading-relaxed text-[#141414]/65 max-w-2xl">
                    {m.desc}
                  </p>
                  <p className="font-body text-sm leading-relaxed text-[#141414]/40 max-w-xl">
                    {m.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>

          </div>{/* end timeline relative */}
        </div>{/* end container */}
      </div>{/* end bottom section */}
    </section>
  );
}
