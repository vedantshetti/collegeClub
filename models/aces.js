const mongoose = require('mongoose');

const acesSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    department: { type: String, default: 'Computer Science' },
    role: { type: String, required: true },
    year: { type: String, required: true },
    projectLink: { type: String, required: true },
    resume: { type: String, required: true }
}, { timestamps: true });

// Check if the model is already defined to avoid OverwriteModelError
module.exports = mongoose.models.Aces || mongoose.model('Aces', acesSchema);
