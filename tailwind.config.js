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
    },
  },
  plugins: [],
};
