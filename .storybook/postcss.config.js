const join = require('path').join
const tailwindJS = join('./src/config/tailwind.config.js')

module.exports = {
  plugins: [require('tailwindcss')(tailwindJS)]
}
