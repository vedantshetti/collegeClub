const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PanclubsToastmasterFormSchema = new Schema({
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

const PanclubsToastmasterForm = mongoose.model('PanclubsToastmasterForm', PanclubsToastmasterFormSchema);

module.exports = PanclubsToastmasterForm;
