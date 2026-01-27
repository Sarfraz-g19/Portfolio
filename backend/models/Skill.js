const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema({
    skillName: {
        type: String,
        required: [true, 'Skill name is required'],
        trim: true,
        unique: true
    },
    category: {
        type: String,
        required: [true, 'Category is required'],
        enum: {
            values: ['frontend', 'backend', 'tools', 'others'],
            message: '{VALUE} is not a valid category'
        },
        lowercase: true
    },
    proficiencyLevel: {
        type: String,
        trim: true,
        default: 'Intermediate'
    },
    order: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Skill', skillSchema);
