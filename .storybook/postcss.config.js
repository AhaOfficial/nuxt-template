const join = require('path').join
const tailwindJS = join('./client/config/tailwind.config.js')

module.exports = {
  plugins: [require('tailwindcss')(tailwindJS)]
}
