/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './App.{js,jsx,ts,tsx}',           // Root App.js
    './src/**/*.{js,jsx,ts,tsx}'       // Everything in src/
  ],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Poppins-Regular'],
        'medium': ['Poppins-Medium'],
        'semibold': ['Poppins-SemiBold'],
        'bold': ['Poppins-Bold'],
      },
    },
  },
  plugins: [],
};