require('dotenv').config()
const express = require('express')
const connectDB = require('./config/db')
const cors = require('cors')

const app = express()

// connect Database
connectDB()

// init middlewares
app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// define routes
app.use('/api/users', require('./routes/userRoutes'))
app.use('/api/factories', require('./routes/factoryRoutes'))

const port = process.env.PORT || 3000

app.listen(port, () => {
  console.log(`Server started on port: ${port}`)
})
