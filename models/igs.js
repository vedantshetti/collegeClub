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
        type: String,
        required: true
    },
    resume: {
        type: String,
        required: true
    }
}, { timestamps: true });

// Check if model is already defined
const Igs = mongoose.models.Igs || mongoose.model('Igs', igsSchema);

module.exports = Igs;
