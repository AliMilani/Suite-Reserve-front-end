/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        vazir: ['vazirmatn'],
        vazirFD: ['Vazirmatn FD']
      },
      colors: {
        pgreen: '#139e93',
        maincolor: '#146d1e',
        maintext: '#498d50',
        fgreen: '#003a36'
      }
    }
  },
  // eslint-disable-next-line no-undef
  plugins: [require('tailwindcss-animated')]
}
