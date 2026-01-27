const mongoose = require('mongoose');

const certificationSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Certification title is required'],
        trim: true
    },
    issuer: {
        type: String,
        required: [true, 'Issuer is required'],
        trim: true
    },
    date: {
        type: String,
        required: true
    },
    verified: {
        type: Boolean,
        default: true
    },
    credentialUrl: String,
    order: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Certification', certificationSchema);
