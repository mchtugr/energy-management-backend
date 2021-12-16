const client = require('../config/pg')

// @desc retrieve factory unit list
// @route GET /api/factories/:factory_id/units
// @access private

const list = (req, res) => {
  const { factory_id } = req.params
  console.log(req)

  client
    .query('SELECT * FROM units WHERE factory_id = $1', [factory_id])
    .then((response) => {
      res.status(200).json({ data: response.rows })
    })
    .catch((err) => {
      res.status(400).json({ err: err.message })
    })
}

// @desc UPDATE factory unit details
// @route PATCH /api/factories/:factory_id/units/:unit_id
// @access private

const edit = (req, res) => {
  const { unit_id } = req.params
  const { unit_name, date_range, usage, usage_fee, discount } = req.body
  client
    .query(
      'UPDATE units SET unit_name=$1,  date_range=$2,  usage=$3,  usage_fee=$4, discount=$5 WHERE id = $6 RETURNING *',
      [unit_name, date_range, usage, usage_fee, discount, unit_id]
    )
    .then((response) => {
      res.status(200).json({ data: response.rows })
    })
    .catch((err) => {
      res.status(400).json({ err: err.message })
    })
}

// @desc ADD new UNIT
// @route POST /api/factories/:factory_id/units
// @access private

const create = (req, res) => {
  const { unit_name, date_range, usage, usage_fee, discount, factory_id } =
    req.body

  client
    .query('INSERT INTO units VALUES ($1, $2, $3, $4, $5, $6) RETURNING *', [
      unit_name,
      date_range,
      usage,
      usage_fee,
      discount,
      factory_id,
    ])
    .then((response) => {
      res.status(200).json({ data: response.rows })
    })
    .catch((err) => {
      res.status(400).json({ err: err.message })
    })
}

// @desc DELETE selected unit
// @route DELETE /api/factories/:factory_id/units/:unit_id
// @access private

const remove = (req, res) => {
  const { unit_id } = req.params
  client
    .query('DELETE FROM units WHERE id = $1 RETURNING *', [unit_id])
    .then((response) => {
      res.status(200).json({ msg: response.rows })
    })
    .catch((err) => {
      res.status(400).json({ err: err.message })
    })
}

// @desc CREATE new column
// @route POST /api/factories/:factory_id/units/columns
// @access private

const addColumn = (req, res) => {
  const { name, type } = req.body

  client
    .query(`ALTER TABLE units ADD COLUMN ${name} ${type}`)
    .then(() => {
      res.status(200).json({ msg: 'success' })
    })
    .catch((err) => {
      res.status(400).json({ err: err.message })
    })
}

// @desc DELETE a column
// @route DELETE /api/factories/:factory_id/units/columns/:name
// @access private

const removeColumn = (req, res) => {
  const { name } = req.params
  client
    .query(`ALTER TABLE units DROP COLUMN IF EXISTS ${name} `)
    .then(() => {
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
