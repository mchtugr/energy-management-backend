const express = require('express')
const router = express.Router()
const userValidator = require('../middleware/userValidator')
const { registerUser, loginUser } = require('../controllers/userController')

// @route       POST api/users
// @desc        Register a user
// @access      Public

router.route('/').post(userValidator, registerUser)
router.post('/login', loginUser)

module.exports = router
