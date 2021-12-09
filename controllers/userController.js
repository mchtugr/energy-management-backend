const generateToken = require('../utils/generateToken')
const User = require('../models/User')
const { check, validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

// @desc Register a new user
// @route POST /api/users
// @access public

const registerUser = async (req, res) => {
  const { name, email, password, role } = req.body

  try {
    const userExists = await User.findOne({ email })

    //   check whether there is a user with the same email before
    if (userExists) {
      res.status(400).json({ msg: 'User already exists!' })
      throw new Error('User already exists!')
    }

    const newUser = await new User({ name, email, password, role })
    const salt = await bcrypt.genSalt(10)

    newUser.password = await bcrypt.hash(password, salt)

    await newUser.save()

    const payload = {
      user: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        role: newUser.role,
      },
    }

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '1d' },
      (err, token) => {
        if (err) {
          throw err
        } else {
          res.status(200).json({ token })
        }
      }
    )
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server error')
  }
}

module.exports = { registerUser }
