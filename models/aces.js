const mongoose = require('mongoose');

const acesSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    department: { type: String, default: 'Computer Science' },
    role: { type: String, required: true },
    year: { type: String, required: true },
    projectLink: { type: String },
    resume: { type: String }
}, { timestamps: true }); // Adds createdAt and updatedAt fields

const Aces = mongoose.model('Aces', acesSchema);

module.exports = Aces;
