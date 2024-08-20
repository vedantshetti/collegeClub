const mongoose = require('mongoose');

const panclubsVihangFormSchema = new mongoose.Schema({
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
        required: true
    },
    role: {
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
}, {
    timestamps: true
});

module.exports = mongoose.model('PanclubsVihangForm', panclubsVihangFormSchema);
