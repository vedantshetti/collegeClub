const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const enticersSchema = new Schema({
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    department: { type: String, default: 'Electronics and Telecommunication' },
    role: { type: String, required: true },
    year: { type: Number, required: true },
    projectLink: { type: String ,required: true},
    resume: { type: String ,required: true},
}, { timestamps: true });

module.exports = mongoose.model('Enticers', enticersSchema);
