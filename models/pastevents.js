const mongoose = require('mongoose');

// Check if the model has already been compiled
const Pastevents = mongoose.models.Pastevents || mongoose.model('Pastevents', new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
}));

module.exports = Pastevents;
