const { Client } = require('pg')
const client = new Client({
  host: process.env.PG_HOST,
  user: process.env.PG_USER,
  port: process.env.PG_PORT,
  password: process.env.PG_PASSWORD,
  database: process.env.PG_DATABASE,
})

client.connect((err) => {
  if (err) {
    console.error(err.message)
  } else {
    console.log('PG_DB connected')
  }
})

module.exports = client
