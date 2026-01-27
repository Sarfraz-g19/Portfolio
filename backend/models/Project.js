const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Project title is required'],
        trim: true,
        maxlength: [100, 'Title cannot exceed 100 characters']
    },
    description: {
        type: String,
        required: [true, 'Project description is required']
    },
    techStack: {
        type: [String],
        required: [true, 'Tech stack is required'],
        validate: {
            validator: function (v) {
                return v && v.length > 0;
            },
            message: 'A project must have at least one technology in techStack'
        }
    },
    liveLink: {
        type: String,
        trim: true,
        match: [/^https?:\/\/.+/, 'Please provide a valid URL for liveLink']
    },
    githubLink: {
        type: String,
        trim: true,
        match: [/^https?:\/\/.+/, 'Please provide a valid URL for githubLink']
    },
    projectImage: {
        type: String,
        required: [true, 'Project image URL is required'],
        trim: true
    },
    order: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Project', projectSchema);
