const express = require('express')
const router = express.Router()
const {
  retrieveAllFactories,
  updateFactoryList,
  addFactory,
  deleteFactory,
} = require('../controllers/dashboardController')

router.route('/').get(retrieveAllFactories).post(addFactory)

router.route('/:id').delete(deleteFactory).patch(updateFactoryList)

module.exports = router
