const mongoose = require('mongoose');
const Bag = require('../models/bagModel');
const Schema = mongoose.Schema;

const tripSchema = new Schema({
    name: String,
    duration: String,
    bags: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Bag"
        }],
        default: [],
    }
})

module.exports = mongoose.model('Trips', tripSchema);
