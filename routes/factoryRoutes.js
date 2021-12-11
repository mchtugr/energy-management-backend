const express = require('express')
const router = express.Router()
const {
  list,
  edit,
  create,
  remove,
} = require('../controllers/factoryController')

router.route('/').get(list).post(create)

router.route('/:id').delete(remove).patch(edit)

module.exports = router
