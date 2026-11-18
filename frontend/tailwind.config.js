/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f8fafc',
          100: '#f1f5f9',
          500: '#334155',
          600: '#1e293b',
          900: '#0f172a',
          accent: '#2563eb',
          warm: '#ea580c',
          gold: '#eab308'
        }
      }
    },
  },
  plugins: [],
}
