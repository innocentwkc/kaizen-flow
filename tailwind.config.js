/**
 * Tailwind config file 
 * @type {import('tailwindcss').Config} 
 * */
module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontSize: {
      // sm: '0.8rem',
      // base: '1rem',
      // xl: '1.25rem',
      // '2xl': '1.563rem',
      // '3xl': '1.953rem',
      // '4xl': '2.441rem',
      'large': '14rem',
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}

