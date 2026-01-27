import mongoose from 'mongoose';

const profileSchema = new mongoose.Schema({
    name: { type: String, required: true },
    title: { type: String, required: true },
    subtitle: { type: String },
    bio: { type: String, required: true },
    avatar: { type: String },
    availableForHire: { type: Boolean, default: true },
    socialLinks: {
        github: { type: String },
        linkedin: { type: String },
        twitter: { type: String },
        email: { type: String }
    },
    resumeUrl: { type: String }
}, {
    timestamps: true
});

const Profile = mongoose.models.Profile || mongoose.model('Profile', profileSchema);
export default Profile;
