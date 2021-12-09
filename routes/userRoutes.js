const express = require('express')
const router = express.Router()
const userValidator = require('../middleware/userValidator')
const { registerUser } = require('../controllers/userController')

// @route       POST api/users
// @desc        Register a user
// @access      Public

router.route('/').post(userValidator, registerUser)

module.exports = router
