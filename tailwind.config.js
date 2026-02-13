/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {
      colors: {
        sub: "#6B7280",
        primary: "#111827",
        background: "#F0FDFA",
        divider: "#9CA3AF",
        point: "#0284C7",
      },
      backgroundImage: {
        "sky-soft": "linear-gradient(to bottom, #CFE2FF, #E8F0F8, #F7F4ED)",
      },
      animation: {
        "fade-in": "fadeIn 0.2s ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};
