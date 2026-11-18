/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'system-ui', '-apple-system', 'sans-serif'],
      },
      colors: {
        memorial: {
          paper: '#fafaf9',
          border: '#e7e5e4',
          subtle: '#78716c',
          text: '#1c1917',
          candle: '#c2410c',
          candleLight: '#fef3c7',
          deep: '#0c0a09',
        }
      }
    },
  },
  plugins: [],
}
