"use client";
import { useEffect, useState } from "react";
import { motion, LayoutGroup } from "framer-motion";

const TEXT = "Malerei & Bautenschutz Sascha Schmidt";
const CHARS = TEXT.split("");

const FONT = {
  fontFamily: "Syne, sans-serif",
  fontWeight: 700,
  fontSize: "clamp(1.1rem, 2.4vw, 2.8rem)",
  color: "#FFFFFF",
  letterSpacing: "0.06em",
  whiteSpace: "pre",
  display: "inline-block",
};

const EASE = [0.76, 0, 0.24, 1];

// Same S mark as used in the Navbar
function SMark() {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0 }}>
      <span style={{
        fontFamily: "Syne, sans-serif",
        fontWeight: 800,
        fontSize: "clamp(2rem, 4vw, 3.5rem)",
        color: "#B8935A",
        lineHeight: 0.85,
        letterSpacing: "-0.02em",
        display: "block",
      }}>S</span>
      <div style={{ width: "100%", height: "2.5px", backgroundColor: "#B8935A", marginTop: "5px" }} />
    </div>
  );
}

export default function IntroScreen({ onComplete }) {
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setRevealed(true), 1000);
    const t2 = setTimeout(onComplete, 4200);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [onComplete]);

  return (
    <motion.div
      style={{
        position: "fixed", inset: 0, zIndex: 100,
        background: "#141414",
        display: "flex", alignItems: "center", justifyContent: "center",
      }}
      initial={{ opacity: 1 }}
      exit={{
        clipPath: "inset(0 0 100% 0)",
        transition: { duration: 0.7, ease: EASE },
      }}
    >
      <LayoutGroup>

        {/* ── Phase 1: S mark fades+rises into center ── */}
        {!revealed && (
          <motion.div
            layoutId="s-mark"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <SMark />
          </motion.div>
        )}

        {/* ── Phase 2: S slides left (layoutId), text staggered in ── */}
        {revealed && (
          <div style={{ display: "flex", alignItems: "center", gap: "clamp(14px, 2vw, 28px)" }}>
            <motion.div
              layoutId="s-mark"
              transition={{ duration: 1.05, ease: EASE }}
            >
              <SMark />
            </motion.div>

            <div style={{ overflow: "hidden" }}>
              <motion.div
                style={{ display: "flex" }}
                initial="hidden"
                animate="visible"
                variants={{ visible: { transition: { staggerChildren: 0.05, delayChildren: 0.85 } } }}
              >
                {CHARS.map((char, i) => (
                  <motion.span
                    key={i}
                    variants={{
                      hidden: { y: "110%", opacity: 0 },
                      visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: EASE } },
                    }}
                    style={FONT}
                  >
                    {char}
                  </motion.span>
                ))}
              </motion.div>
            </div>
          </div>
        )}

      </LayoutGroup>
    </motion.div>
  );
}
