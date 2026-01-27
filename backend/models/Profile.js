const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    subtitle: String,
    bio: {
        type: String,
        required: true
    },
    avatar: String,
    resumeUrl: String,
    socialLinks: {
        github: String,
        linkedin: String,
        twitter: String,
        email: String,
        phone: String
    },

    availableForHire: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Profile', profileSchema);
