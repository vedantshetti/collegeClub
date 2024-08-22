const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    googleId: String
});

// This plugin adds username and password fields automatically
UserSchema.plugin(passportLocalMongoose);

// Check if the model is already defined to avoid OverwriteModelError
module.exports = mongoose.models.User || mongoose.model('User', UserSchema);
