/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/@relume_io/relume-ui/dist/**/*.{js,mjs}",
  ],
  theme: {
    extend: {
      fontFamily: {
        heading: ["Syne", "sans-serif"],
        serif: ["Playfair Display", "Georgia", "serif"],
        body: ["DM Sans", "sans-serif"],
      },
      colors: {
        // ── Surfaces ────────────────────────────────────────────────
        background: {
          primary: "#FAFAFA",
          secondary: "#F2F0EC",
          alternative: "#141414",
        },
        // ── Text ────────────────────────────────────────────────────
        text: {
          DEFAULT: "#141414",
          primary: "#141414",
          secondary: "#6B6B6B",
          alternative: "#FAFAFA",
        },
        // ── Borders ─────────────────────────────────────────────────
        border: {
          primary: "rgba(184,147,90,0.18)",
          alternative: "rgba(184,147,90,0.10)",
        },
        // ── Brand palette ───────────────────────────────────────────
        hoser: {
          gold: "#B8935A",
          "gold-light": "#C9A96E",
          cream: "#FAFAFA",
          charcoal: "#141414",
          stone: "#6B6B6B",
          navy: "#141414",
          "navy-light": "#1C1C1C",
          "navy-deep": "#0D0D0D",
        },
        neutral: {
          lightest: "#FFFFFF",
        },
      },
      animation: {
        "marquee-top": "marquee-top 50s linear infinite",
        "marquee-bottom": "marquee-bottom 50s linear infinite",
        "marquee-left": "marquee-left 25s linear infinite",
        "marquee-right": "marquee-right 25s linear infinite",
        "scroll-down": "scroll-down 1.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) infinite",
      },
      keyframes: {
        "marquee-top": {
          "0%": { transform: "translateY(0)" },
          "100%": { transform: "translateY(-50%)" },
        },
        "marquee-bottom": {
          "0%": { transform: "translateY(-50%)" },
          "100%": { transform: "translateY(0)" },
        },
        "marquee-left": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "marquee-right": {
          "0%": { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0)" },
        },
        "scroll-down": {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100%)" },
        },
      },
      boxShadow: {
        xlarge: "0px 24px 48px -12px rgba(184, 147, 90, 0.12)",
      },
      fontSize: {
        md: ["1.125rem", { lineHeight: "1.5" }],
        "10xl": ["3.5rem", { lineHeight: "1.2" }],
      },
      spacing: {
        18: "4.5rem",
      },
      minHeight: {
        18: "4.5rem",
      },
    },
  },
  plugins: [],
};
