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
        type: String
    },
    resume: {
        type: String
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('PanclubsVihangForm', panclubsVihangFormSchema);
