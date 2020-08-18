const join = require('path').join
const tailwindJS = join(__dirname, 'client/config/tailwind.config.js')

module.exports = {
  plugins: [require('tailwindcss')(tailwindJS), require('autoprefixer')]
}
