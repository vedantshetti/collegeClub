const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const isaSchema = new Schema({
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    department: { type: String, default: 'Artificial Intelligence and Data Science' },
    role: { type: String, required: true },
    year: { type: Number, required: true },
    projectLink: { type: String},
    resume: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Isa', isaSchema);
