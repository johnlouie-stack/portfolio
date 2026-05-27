/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  darkMode: 'class',

  theme: {
    extend: {
      fontFamily: {
        sans: ["Sora", "DM Sans", "system-ui", "sans-serif"],
      },
      fontSize: {
        "2xs": ["0.625rem", { lineHeight: "1rem" }],
      },
      colors: {
        brand: {
          cyan:   "#22d3ee",
          violet: "#7c3aed",
          blue:   "#3b82f6",
        },
      },
      backdropBlur: {
        xs: "2px",
      },
      boxShadow: {
        glow:         "0 0 40px -10px rgba(34, 211, 238, 0.4)",
        "glow-lg":    "0 0 80px -10px rgba(34, 211, 238, 0.35)",
        "glow-violet":"0 0 40px -10px rgba(124, 58, 237, 0.4)",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)"   },
          "50%":      { transform: "translateY(-12px)" },
        },
        "spin-slow": {
          to: { transform: "rotate(360deg)" },
        },
        shimmer: {
          "0%":   { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition:  "200% 0" },
        },
      },
      animation: {
        float:       "float 4s ease-in-out infinite",
        "spin-slow": "spin-slow 12s linear infinite",
        shimmer:     "shimmer 1.8s infinite",
      },
      screens: {
        "2xl": "1536px",
        "3xl": "1920px",
      },
    },
  },

  plugins: [],
};