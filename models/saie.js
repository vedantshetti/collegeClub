const mongoose = require('mongoose');

const saieSchema = new mongoose.Schema({
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
        default: 'Instrumentation Engineering'
    },
    role: {
        type: String,
        required: true
    },
    year: {
        type: String,
        required: true
    },
    projectLink: {
        type: String, required: true
    },
    resume: {
        type: String, required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Saie', saieSchema);
