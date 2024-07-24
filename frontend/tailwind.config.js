/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html",     
  "./src/**/*.{js,ts,jsx,tsx}",],
  theme: {
    extend: {
      maxHeight: {
        '0': '0',
        '64': '16rem', // Dostosuj tę wartość do odpowiedniej wysokości po otwarciu menu
      },
      transitionProperty: {
        'max-height': 'max-height',
      }
    },
  },
  plugins: [],
}

