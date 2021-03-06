const client = require('../config/pg')

// @desc retrieve factory list
// @route GET /api/dashboard/factories
// @access private

const list = (req, res) => {
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
// @route PATCH /api/dashboard/factories/:id
// @access private

const edit = (req, res) => {
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
      res.status(400).json({ err: err.message })
    })
}

// @desc ADD new factory
// @route POST /api/dashboard/factories
// @access private

const create = (req, res) => {
  const { name, membership_date, membership_due, company_size, gold_member } =
    req.body

  client
    .query('INSERT INTO factories VALUES ($1, $2, $3, $4, $5) RETURNING *', [
      name,
      membership_date,
      membership_due,
      company_size,
      gold_member,
    ])
    .then((response) => {
      res.status(200).json({ data: response.rows })
    })
    .catch((err) => {
      res.status(400).json({ err: err.message })
    })
}

// @desc DELETE new factory
// @route DELETE /api/dashboard/factories/:id
// @access private

const remove = (req, res) => {
  const { id } = req.params
  client
    .query('DELETE FROM factories WHERE id = $1 RETURNING *', [id])
    .then((response) => {
      res.status(200).json({ msg: response.rows })
    })
    .catch((err) => {
      res.status(400).json({ err: err.message })
    })
}

// @desc CREATE new column
// @route POST /api/dashboard/factories/columns
// @access private

const addColumn = (req, res) => {
  const { name, type } = req.body

  client
    .query(`ALTER TABLE factories ADD COLUMN ${name} ${type}`)
    .then((response) => {
      res.status(200).json({ msg: 'success' })
    })
    .catch((err) => {
      res.status(400).json({ err: err.message })
    })
}

// @desc DELETE a column
// @route DELETE /api/dashboard/factories/columns/:name
// @access private

const removeColumn = (req, res) => {
  const { name } = req.params
  client
    .query(`ALTER TABLE factories DROP COLUMN IF EXISTS ${name} `)
    .then((response) => {
      res.status(200).json({ msg: 'success' })
    })
    .catch((err) => {
      res.status(400).json({ err: err.message })
    })
}

module.exports = {
  list,
  edit,
  create,
  remove,
  addColumn,
  removeColumn,
}
