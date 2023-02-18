/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary' : "#222222"
      },
      maxWidth: {
        'primary': "1300px"
      },
      fontSize: {
        'header': "2.5rem",
        'mdHeader': '1.2rem',
        'smHeader': '0.8rem'
      },
      boxShadow: {
        '3xl': '0px 0px 20px rgba(0,0,0,0.5)',
      }
    },
  },
  plugins: [],
}
