const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const enticersSchema = new Schema({
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
        default: 'Electronics and Telecommunication' // Adjust as needed
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

// Avoid overwriting the model
const Enticers = mongoose.models.Enticers || mongoose.model('Enticers', enticersSchema);

module.exports = Enticers;
