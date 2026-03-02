/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        echo: {
          void: "#0A0A0F",
          surface: "#111118",
          cyan: "#00E5FF",
          primary: "#E8E8F0",
          muted: "#555570",
        }
      },
      fontFamily: {
        display: ["Geist Mono", "JetBrains Mono", "monospace"],
        body: ["DM Sans", "Outfit", "sans-serif"],
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
}
