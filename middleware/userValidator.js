const { check, validationResult } = require('express-validator')

const userValidator = [
  check('name', 'Name is required!').notEmpty(),
  check('name', 'Name should not include numbers').matches(/^[a-zA-Z]+$/),
  check('email', 'Please enter a valid email').isEmail().normalizeEmail(),
  check('password', 'Your password should be min 8 characters').isLength({
    min: 8,
  }),
  check('password', 'Your password should include uppercase letter').matches(
    /^(?=.*[A-Z])/
  ),
  check('role', 'Your role should be admin or editor').isIn([
    'admin',
    'editor',
  ]),
  (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() })
    } else {
      next()
    }
  },
]

module.exports = userValidator
