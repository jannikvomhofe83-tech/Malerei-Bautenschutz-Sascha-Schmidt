"use client";

import React, { useRef, useEffect, useState } from "react";
import { useScroll, useMotionValueEvent, motion, useTransform, useMotionValue, useSpring } from "framer-motion";

const FRAME_COUNT = 227;

// --- Helper für die Überschriften (Top Left, dauerhaft für den Abschnitt) ---
function SectionTitle({ scrollYProgress, start, end, title }) {
  const duration = end - start;
  const fade = Math.min(0.02, duration * 0.2); // Verhindert Framer-Motion Crash durch zu kurze Intervalle
  const opacity = useTransform(
    scrollYProgress, 
    [start, start + fade, end - fade, end], 
    [0, 1, 1, 0]
  );

  return (
    <motion.div 
      className="absolute top-24 left-[5%] md:left-[10%] z-30 pointer-events-none"
      style={{ opacity }}
    >
      <p className="mb-3 font-body text-sm font-semibold uppercase tracking-[0.25em] text-hoser-gold" style={{ textShadow: "0 2px 10px rgba(0,0,0,0.8)" }}>
        {title}
      </p>
    </motion.div>
  );
}

// --- Helper für die Untertexte (Bottom Right, wechseln durch) ---
function SectionSubtitle({ scrollYProgress, start, end, subtitle }) {
  const duration = end - start;
  const fade = Math.min(0.015, duration * 0.25);
  const opacity = useTransform(
    scrollYProgress, 
    [start, start + fade, end - fade, end], 
    [0, 1, 1, 0]
  );

  return (
    <motion.div 
      className="absolute bottom-24 right-[5%] md:right-[10%] z-30 pointer-events-none text-right"
      style={{ opacity }}
    >
      <p className="max-w-md font-body text-base text-white/90 md:text-2xl font-light" style={{ textShadow: "0 2px 15px rgba(0,0,0,0.9), 0 1px 5px rgba(0,0,0,0.8)" }}>
        {subtitle}
      </p>
    </motion.div>
  );
}

export function VideoScrollSection() {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);
  const imagesRef = useRef([]);
  const [imagesLoaded, setImagesLoaded] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Load images (HQ)
  useEffect(() => {
    let loadedCount = 0;
    const images = [];

    for (let i = 1; i <= FRAME_COUNT; i++) {
      const img = new Image();
      const paddedIndex = i.toString().padStart(4, "0");
      img.src = `/images/video3-sequence/frame_${paddedIndex}.jpg`;
      
      img.onload = () => {
        loadedCount++;
        setImagesLoaded(loadedCount);
        if (loadedCount === 1) {
          drawFrame(0);
        }
      };
      images.push(img);
    }
    imagesRef.current = images;
  }, []);

  const currentFrameRef = useRef(-1);
  const rafIdRef = useRef(null);

  const drawFrame = (frameIndex) => {
    if (frameIndex === currentFrameRef.current) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false }); 
    const img = imagesRef.current[frameIndex];

    if (img && img.complete) {
      currentFrameRef.current = frameIndex;
      
      const dpr = window.devicePixelRatio || 1;
      const physicalWidth = canvas.clientWidth * dpr;
      const physicalHeight = canvas.clientHeight * dpr;
      
      if (canvas.width !== physicalWidth || canvas.height !== physicalHeight) {
        canvas.width = physicalWidth;
        canvas.height = physicalHeight;
      }

      const canvasAspect = canvas.width / canvas.height;
      const imgAspect = img.width / img.height;
      let renderWidth, renderHeight, x, y;

      if (canvasAspect > imgAspect) {
        renderWidth = canvas.width;
        renderHeight = canvas.width / imgAspect;
        x = 0;
        y = (canvas.height - renderHeight) / 2;
      } else {
        renderHeight = canvas.height;
        renderWidth = canvas.height * imgAspect;
        y = 0;
        x = (canvas.width - renderWidth) / 2;
      }

      ctx.imageSmoothingEnabled = true;
      ctx.drawImage(img, x, y, renderWidth, renderHeight);
    }
  };

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const frameIndex = Math.min(
      FRAME_COUNT - 1,
      Math.max(0, Math.floor(latest * FRAME_COUNT))
    );
    
    if (rafIdRef.current) {
      cancelAnimationFrame(rafIdRef.current);
    }
    rafIdRef.current = requestAnimationFrame(() => {
      drawFrame(frameIndex);
    });
  });

  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        currentFrameRef.current = -1;
        const latest = scrollYProgress.get();
        const frameIndex = Math.min(FRAME_COUNT - 1, Math.max(0, Math.floor(latest * FRAME_COUNT)));
        drawFrame(frameIndex);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    };
  }, [scrollYProgress]);

  // --- Premium 3D Effects ---
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [6, -6]), { damping: 40, stiffness: 150 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-6, 6]), { damping: 40, stiffness: 150 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.set((e.clientX / window.innerWidth) - 0.5);
      mouseY.set((e.clientY / window.innerHeight) - 0.5);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  const videoScale = useTransform(scrollYProgress, [0, 1], [1.02, 1.25]);
  const vignetteOpacity = useTransform(scrollYProgress, [0, 1], [0.3, 0.85]);

  return (
    <section ref={sectionRef} className="relative w-full bg-[#040D1C]" style={{ height: "1500vh" }}>
      <div className="sticky top-0 h-screen w-full overflow-hidden" style={{ perspective: "1500px" }}>
        
        {/* The 3D Parallax Wrapper */}
        <motion.div 
          className="absolute inset-0 size-full"
          style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        >
          {/* HD Video Canvas */}
          <motion.canvas
            ref={canvasRef}
            className="absolute inset-0 h-full w-full opacity-90"
            style={{ 
              scale: videoScale, 
              transformOrigin: "center center",
              willChange: "transform"
            }}
          />

          {/* Intro Section */}
          <SectionTitle scrollYProgress={scrollYProgress} start={0.00} end={0.02} title="Unsere Leistungen" />
          <SectionSubtitle scrollYProgress={scrollYProgress} start={0.00} end={0.02} subtitle="Das gesamte Spektrum des Bauens – von der Skizze bis zur schlüsselfertigen Übergabe." />

          {/* Sequence 1: Hochbau & Neubau */}
          <SectionTitle scrollYProgress={scrollYProgress} start={0.03} end={0.19} title="Hochbau & Neubau" />
          <SectionSubtitle scrollYProgress={scrollYProgress} start={0.04} end={0.10} subtitle="Fundierte Planung und massive Bauweise." />
          <SectionSubtitle scrollYProgress={scrollYProgress} start={0.10} end={0.16} subtitle="Dein Projekt, Stein für Stein verwirklicht." />

          {/* Sequence 2: Erdbau & Kanalbau */}
          <SectionTitle scrollYProgress={scrollYProgress} start={0.20} end={0.39} title="Erdbau & Kanalbau" />
          <SectionSubtitle scrollYProgress={scrollYProgress} start={0.22} end={0.29} subtitle="Millimetergenaue Präzision tief im Erdreich." />
          <SectionSubtitle scrollYProgress={scrollYProgress} start={0.30} end={0.37} subtitle="Sichere Netze und ein stabiles Fundament." />

          {/* Sequence 3: Sanierung & Umbau */}
          <SectionTitle scrollYProgress={scrollYProgress} start={0.40} end={0.59} title="Sanierung & Umbau" />
          <SectionSubtitle scrollYProgress={scrollYProgress} start={0.42} end={0.49} subtitle="Neues Leben für bestehende Strukturen." />
          <SectionSubtitle scrollYProgress={scrollYProgress} start={0.50} end={0.57} subtitle="Energieeffizient und modernisiert für die Zukunft." />

          {/* Sequence 4: Ingenieurbau */}
          <SectionTitle scrollYProgress={scrollYProgress} start={0.60} end={0.79} title="Ingenieurbau" />
          <SectionSubtitle scrollYProgress={scrollYProgress} start={0.62} end={0.69} subtitle="Komplexe Konstruktionen sicher gemeistert." />
          <SectionSubtitle scrollYProgress={scrollYProgress} start={0.70} end={0.77} subtitle="Tragwerke für höchste Anforderungen." />

          {/* Sequence 5: Industrie- & Gewerbebau */}
          <SectionTitle scrollYProgress={scrollYProgress} start={0.80} end={0.99} title="Industrie- & Gewerbebau" />
          <SectionSubtitle scrollYProgress={scrollYProgress} start={0.82} end={0.89} subtitle="Funktionale Architektur und große Hallen." />
          <SectionSubtitle scrollYProgress={scrollYProgress} start={0.90} end={0.97} subtitle="Gebaut für deinen wirtschaftlichen Erfolg." />

        </motion.div>

        {/* Dynamic Vignette Overlay */}
        <motion.div 
          className="pointer-events-none absolute inset-0 mix-blend-multiply z-10"
          style={{ 
            opacity: vignetteOpacity,
            background: "radial-gradient(circle at center, transparent 30%, #000 100%)" 
          }}
        />

        {/* Cinematic Grain Overlay */}
        <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.12] mix-blend-overlay z-10" xmlns="http://www.w3.org/2000/svg">
          <filter id="cinematic-grain">
            <feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves="3" stitchTiles="stitch" />
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#cinematic-grain)" />
        </svg>
        
        {/* Loading Indicator */}
        {imagesLoaded < FRAME_COUNT && (
          <div className="absolute top-4 left-4 text-xs font-body uppercase tracking-widest text-white/50 z-50">
            Lade HD-Video... {Math.round((imagesLoaded / FRAME_COUNT) * 100)}%
          </div>
        )}

      </div>
    </section>
  );
}
