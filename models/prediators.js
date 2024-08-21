const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const prediatorsSchema = new Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        trim: true
    },
    phone: {
        type: String,
        required: true
    },
    department: {
        type: String,
        default: 'Mechanical Engineering'
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

const Prediators = mongoose.model('Prediators', prediatorsSchema);

module.exports = Prediators;
