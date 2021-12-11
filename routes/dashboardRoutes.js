const express = require('express')
const router = express.Router()
const {
  retrieveAllFactories,
  updateFactoryList,
} = require('../controllers/dashboardController')

router.route('/').get(retrieveAllFactories).patch(updateFactoryList)

module.exports = router
