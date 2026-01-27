import mongoose from 'mongoose';

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
    },
    liveLink: {
        type: String,
        trim: true,
    },
    githubLink: {
        type: String,
        trim: true,
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

export default mongoose.models.Project || mongoose.model('Project', projectSchema);
