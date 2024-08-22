const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define schema
const s4dsSchema = new Schema({
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    department: { type: String, default: 'Artificial Intelligence and Data Science' },
    role: { type: String, required: true },
    year: { type: Number, required: true },
    projectLink: { type: String, required: true },
    resume: { type: String, required: true },
}, { timestamps: true });

// Check if model already exists
const S4ds = mongoose.models.S4ds || mongoose.model('S4ds', s4dsSchema);

module.exports = S4ds;
