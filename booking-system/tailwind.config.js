/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}", './node_modules/flowbite-react/lib/esm/**/*.js',],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui"), require('flowbite/plugin')],
}