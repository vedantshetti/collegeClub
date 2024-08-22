const mongoose = require('mongoose');

const panclubsNssFormSchema = new mongoose.Schema({
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
        type: String,
        required: true
    },
    resume: {
        type: String,
        required: true
    }
}, { timestamps: true });

// Check if the model is already defined
const PanclubsNssForm = mongoose.models.PanclubsNssForm || mongoose.model('PanclubsNssForm', panclubsNssFormSchema);

module.exports = PanclubsNssForm;
