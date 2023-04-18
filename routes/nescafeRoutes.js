const express = require('express')
const { sampleAdd, sampleEdit, sampleDelete } = require('../controllers/nescafeController')


const Router = express.Router()

// Routes
Router.post('/sample/add',sampleAdd)
Router.post('/sample/edit',sampleEdit)
Router.post('/sample/delete',sampleDelete)

module.exports = Router