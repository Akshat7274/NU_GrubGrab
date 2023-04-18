const mongoose = require('mongoose')

const sampleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter a valid name"]
    }
}, { timestamps: true })

const sampleModel = new mongoose.model('sample',sampleSchema)
module.exports = sampleModel