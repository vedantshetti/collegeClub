const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Check if the model is already defined
const PanclubsAbhivyaktiForm = mongoose.models.PanclubsAbhivyaktiForm || mongoose.model('PanclubsAbhivyaktiForm', new Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    department: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    projectLink: {
        type: String, required: true
    },
    resume: {
        type: String, required: true
    }
}, {
    timestamps: true
}));

module.exports = PanclubsAbhivyaktiForm;
