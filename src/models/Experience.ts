import mongoose from 'mongoose';

const experienceSchema = new mongoose.Schema({
    companyName: { type: String, required: true },
    role: { type: String, required: true },
    duration: { type: String, required: true }, // e.g., "Jan 2023 - Present"
    description: { type: [String], required: true }, // Array of bullet points
    technologiesUsed: { type: [String] },
    order: { type: Number, default: 0 }
}, {
    timestamps: true
});

const Experience = mongoose.models.Experience || mongoose.model('Experience', experienceSchema);
export default Experience;
