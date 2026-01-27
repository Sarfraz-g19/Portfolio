const mongoose = require('mongoose');

const EducationSchema = new mongoose.Schema({
    institution: { type: String, required: true },
    degree: { type: String, required: true },
    fieldOfStudy: { type: String },
    startDate: { type: Date, required: true },
    endDate: { type: Date },
    current: { type: Boolean, default: false },
    grade: { type: String },
    logo: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Education', EducationSchema);
