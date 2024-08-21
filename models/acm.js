const mongoose = require('mongoose');

const acmSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    department: { type: String, default: 'Computer Science' },
    role: { type: String, required: true },
    year: { type: Number, required: true },
    projectLink: { type: String },
    resume: { type: String }
}, { timestamps: true });

const Acm = mongoose.model('Acm', acmSchema);

module.exports = Acm;
