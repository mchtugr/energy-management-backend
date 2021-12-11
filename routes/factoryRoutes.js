const express = require('express')
const router = express.Router()
const {
  list,
  edit,
  create,
  remove,
  addColumn,
  removeColumn,
} = require('../controllers/factoryController')

router.route('/').get(list).post(create)

router.route('/:id').delete(remove).patch(edit)
router.route('/columns').post(addColumn)
router.route('/columns/:name').delete(removeColumn)

module.exports = router
