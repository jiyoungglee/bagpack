const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bagSchema = new Schema({
    items: {
        type: [String],
        default: [],
    },
})

module.exports = mongoose.model('Bag', bagSchema);
