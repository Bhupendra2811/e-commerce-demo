/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: { backgroundImage: { 'background': "url('/src/assets/background.jpg')" } }
  },
  plugins: []
}
