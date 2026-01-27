import mongoose from 'mongoose';

const skillSchema = new mongoose.Schema({
    skillName: { type: String, required: true },
    category: { type: String, required: true }, // e.g., 'frontend', 'backend', 'tools'
    proficiencyLevel: { type: String, required: true }, // e.g., 'Beginner', 'Intermediate', 'Advanced'
    icon: { type: String }, // Optional: URL or icon class name
    order: { type: Number, default: 0 }
}, {
    timestamps: true
});

export default mongoose.models.Skill || mongoose.model('Skill', skillSchema);
