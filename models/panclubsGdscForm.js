const mongoose = require('mongoose');

const panclubsGdscFormSchema = new mongoose.Schema({
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
        type: String // This will store the path to the uploaded file, 
        ,
        required: true
    }
}, { timestamps: true });

const PanclubsGdscForm = mongoose.model('PanclubsGdscForm', panclubsGdscFormSchema);

module.exports = PanclubsGdscForm;
