const mongoose = require('mongoose')

const OrderSchema = new mongoose.Schema({
    customer: {
        type: String,
        required: true,
        maxlength: 60,
    },

    address: {
        type: String,
        required: true,
        maxlength: 200,
    },

    total: {
        type: Number,
        required: true,
    },

    status: {
        type: Number,
        default: 0,
    },

    methods: {
        type: Number,
        required: true,
    },

},

    { timestamps: true }
);

const Order = new mongoose.model('Product', OrderSchema)
module.exports = Order