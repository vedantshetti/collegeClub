const mongoose = require('mongoose');

const panclubsOffbitFormSchema = new mongoose.Schema({
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
    year: {
        type: String,
        required: true
    },
    projectLink: {
        type: String
    },
    resume: {
        type: String
    }
});

const PanclubsOffbitForm = mongoose.model('PanclubsOffbitForm', panclubsOffbitFormSchema);

module.exports = PanclubsOffbitForm;
