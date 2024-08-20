const mongoose = require('mongoose');

const mesaSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    department: { type: String, default: 'Mechanical Engineering' },
    role: { type: String, required: true },
    year: { type: String, required: true },
    projectLink: { type: String, required: true },
    resume: { type: String, required: true }
}, { timestamps: true });

const Mesa = mongoose.model('Mesa', mesaSchema);

module.exports = Mesa;
