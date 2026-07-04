/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        "nsans-light": ["Nsans Light", "sans-serif"],
        "nsans-regular": ["Nsans Regular", "sans-serif"],
        "nsans-medium": ["Nsans Medium", "sans-serif"],
        "nsans-bold": ["Nsans Bold", "sans-serif"],
      },
      transitionDuration: {
        "250": "250ms",
        "400": "400ms",
        "600": "600ms",
        "800": "800ms",
        "900": "900ms",
        "1200": "1200ms",
        "1500": "1500ms",
        "2000": "2000ms",
      },
      transitionTimingFunction: {
        "butter": "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        "spring": "cubic-bezier(0.34, 1.56, 0.64, 1)",
        "snappy": "cubic-bezier(0.4, 0, 0.2, 1)",
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in-down": {
          "0%": { opacity: "0", transform: "translateY(-24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in-scale": {
          "0%": { opacity: "0", transform: "scale(0.92)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        "slide-in-left": {
          "0%": { opacity: "0", transform: "translateX(-32px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        "hero-text": {
          "0%": { opacity: "0", transform: "translateY(32px) scale(0.96)" },
          "100%": { opacity: "1", transform: "translateY(0) scale(1)" },
        },
        "tudum-ripple-1": {
          "0%": { width: "0px", height: "0px", opacity: "1" },
          "100%": { width: "400px", height: "400px", opacity: "0" },
        },
        "tudum-ripple-2": {
          "0%": { width: "0px", height: "0px", opacity: "1" },
          "100%": { width: "600px", height: "600px", opacity: "0" },
        },
        "tudum-ripple-3": {
          "0%": { width: "0px", height: "0px", opacity: "1" },
          "100%": { width: "900px", height: "900px", opacity: "0" },
        },
        "tudum-bar": {
          "0%, 100%": { transform: "scaleY(0.4)", opacity: "0.7" },
          "50%": { transform: "scaleY(1)", opacity: "1" },
        },
        "shimmer": {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "pulse-red": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.5" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
        "scale-in": {
          "0%": { transform: "scale(0)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        "chevron-bounce-left": {
          "0%, 100%": { transform: "translateX(0)" },
          "50%": { transform: "translateX(-4px)" },
        },
        "chevron-bounce-right": {
          "0%, 100%": { transform: "translateX(0)" },
          "50%": { transform: "translateX(4px)" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.4s ease-out forwards",
        "fade-in-up": "fade-in-up 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards",
        "fade-in-down": "fade-in-down 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards",
        "fade-in-scale": "fade-in-scale 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards",
        "slide-in-left": "slide-in-left 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards",
        "hero-text": "hero-text 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards",
        "tudum-ripple-1": "tudum-ripple-1 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards",
        "tudum-ripple-2": "tudum-ripple-2 1.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.1s forwards",
        "tudum-ripple-3": "tudum-ripple-3 2s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.2s forwards",
        "tudum-bar": "tudum-bar 0.8s ease-in-out infinite",
        "shimmer": "shimmer 2s linear infinite",
        "pulse-red": "pulse-red 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "float": "float 3s ease-in-out infinite",
        "scale-in": "scale-in 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) forwards",
        "chevron-left": "chevron-bounce-left 0.6s ease-in-out infinite",
        "chevron-right": "chevron-bounce-right 0.6s ease-in-out infinite",
        "spin-slow": "spin 3s linear infinite",
        "fade-in-200": "fade-in 0.4s ease-out 0.2s forwards",
        "fade-in-400": "fade-in 0.4s ease-out 0.4s forwards",
        "fade-in-up-200": "fade-in-up 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.2s forwards",
        "fade-in-up-400": "fade-in-up 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.4s forwards",
        "fade-in-up-600": "fade-in-up 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.6s forwards",
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  /* eslint-disable @typescript-eslint/no-require-imports, no-undef */
  plugins: [require("tailwind-scrollbar-hide")],
}