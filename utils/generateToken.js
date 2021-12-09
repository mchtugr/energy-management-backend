const jwt = require('jsonwebtoken')

const generateToken = (id) => {
  return jwt.signIn({ id }, process.env.JWT_SECRET, { expiresIn: '1d' })
}

module.exports = generateToken
