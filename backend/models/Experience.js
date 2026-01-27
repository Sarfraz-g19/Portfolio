const mongoose = require('mongoose');

const experienceSchema = new mongoose.Schema({
    companyName: {
        type: String,
        required: [true, 'Company name is required'],
        trim: true
    },
    role: {
        type: String,
        required: [true, 'Role is required'],
        trim: true
    },
    duration: {
        type: String,
        required: [true, 'Duration is required'],
        trim: true
    },
    description: {
        type: [String],
        required: [true, 'Experience description is required'],
        validate: {
            validator: function (v) {
                return v && v.length > 0;
            },
            message: 'An experience must have at least one description point'
        }
    },
    technologiesUsed: {
        type: [String],
        default: []
    },
    order: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Experience', experienceSchema);
