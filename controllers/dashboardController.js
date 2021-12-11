const client = require('../config/pg')

// @desc retrieve factory list
// @route POST /api/dashboard/factories
// @access private

const retrieveAllFactories = (req, res) => {
  client
    .query('SELECT * FROM factories')
    .then((response) => {
      res.status(200).json({ data: response.rows })
    })
    .catch((err) => {
      res.status(400).json({})
    })
}

module.exports = { retrieveAllFactories }
