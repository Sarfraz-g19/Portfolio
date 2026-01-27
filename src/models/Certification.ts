import mongoose from 'mongoose';

const certificationSchema = new mongoose.Schema({
    title: { type: String, required: true },
    issuer: { type: String, required: true },
    date: { type: String, required: true }, // Year or Date string
    credentialUrl: { type: String },
    verified: { type: Boolean, default: false }
}, {
    timestamps: true
});

const Certification = mongoose.models.Certification || mongoose.model('Certification', certificationSchema);
export default Certification;
