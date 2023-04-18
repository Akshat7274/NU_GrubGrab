const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const dotenv = require('dotenv')
const colors = require('colors')
const connectDB = require('./config/connectDB')


const app = express() // REST Object Declaration

// Dotenv Config
dotenv.config()

// Database Connection Call
connectDB()

// Middlewares
app.use(morgan('dev'))
app.use(express.json())
app.use(cors())

// Routes
app.use('/api/v1/nescafe',require('./routes/nescafeRoutes'))

// Port Declaration
const PORT = 8080 || process.env.PORT

// Server Listening
app.listen(PORT, () => {
    console.log(`Server Running on Port No. ${PORT}`.bgGreen)
})