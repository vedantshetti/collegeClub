const mongoose = require('mongoose');

const igsSchema = new mongoose.Schema({
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
        default: 'Civil Engineering'
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
        type: String
    },
    resume: {
        type: String
    }
}, { timestamps: true });

module.exports = mongoose.model('Igs', igsSchema);
