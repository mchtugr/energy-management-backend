const express = require('express')
const router = express.Router()
const {
  list,
  edit,
  create,
  remove,
  addColumn,
  removeColumn,
} = require('../controllers/unitController')

router.route('/:factory_id/units').get(list).post(create)

router.route('/:factory_id/units/:unit_id').delete(remove).patch(edit)
router.route('/:factory_id/units/columns').post(addColumn)
router.route('/:factory_id/units/columns/:name').delete(removeColumn)

module.exports = router
