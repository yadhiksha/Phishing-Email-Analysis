/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cyber: {
          bg: '#070b14',
          card: '#0c1322',
          surface: '#111c33',
          border: '#1e2e4f',
          text: '#e2e8f0',
          muted: '#8b9bb4',
          accent: '#00f0ff',
          neonBlue: '#38bdf8',
          neonPurple: '#a855f7',
          neonEmerald: '#10b981',
          neonAmber: '#f59e0b',
          neonRose: '#f43f5e',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'Consolas', 'monospace']
      }
    },
  },
  plugins: [],
}
