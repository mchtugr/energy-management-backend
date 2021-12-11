const express = require('express')
const router = express.Router()
const {
  retrieveAllFactories,
  updateFactoryList,
  addFactory,
} = require('../controllers/dashboardController')

router
  .route('/')
  .get(retrieveAllFactories)
  .patch(updateFactoryList)
  .post(addFactory)

module.exports = router
