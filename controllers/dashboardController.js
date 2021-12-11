const client = require('../config/pg')

// @desc retrieve factory list
// @route GET /api/dashboard/factories
// @access private

const retrieveAllFactories = (req, res) => {
  client
    .query('SELECT * FROM factories')
    .then((response) => {
      res.status(200).json({ data: response.rows })
    })
    .catch((err) => {
      res.status(400).json({ err: err.message })
    })
}

// @desc UPDATE factory list
// @route POST /api/dashboard/factories
// @access private

const updateFactoryList = (req, res) => {
  const { id } = req.params
  const { name, membership_date, membership_due, company_size, gold_member } =
    req.body
  client
    .query(
      'UPDATE factories SET name=$1,  membership_date=$2,  membership_due=$3,  company_size=$4, gold_member=$5 WHERE id = $6 RETURNING *',
      [name, membership_date, membership_due, company_size, gold_member, id]
    )
    .then((response) => {
      res.status(200).json({ data: response.rows })
    })
    .catch((err) => {
      res.status(400).json({ err: err })
    })
}

module.exports = { retrieveAllFactories, updateFactoryList }
