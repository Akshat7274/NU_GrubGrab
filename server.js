const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const dotenv = require('dotenv')
const colors = require('colors')

const app = express() // REST Object Declaration

// Dotenv Config
dotenv.config()

// Middlewares
app.use(morgan('dev'))
app.use(express.json())
app.use(cors())

// Routes
app.get("/", (req,res) => {
    res.send("<h1>Hello from Server</h1>");
})

// Port Declaration
const PORT = 8080 || process.env.PORT

// Server Listening
app.listen(PORT, () => {
    console.log(`Server Running on Port No. ${PORT}`.bgGreen)
})