const join = require('path').join
const tailwindJS = join(__dirname, 'client/config/tailwind.config.js')

module.exports = {
  // , require('autoprefixer')
  plugins: [require('tailwindcss')(tailwindJS)]
}
