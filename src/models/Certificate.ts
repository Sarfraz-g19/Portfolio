import mongoose, { Schema, Document, Model } from "mongoose";

export interface ICertificate extends Document {
    title: string;
    organization: string;
    year: number;
    certificateUrl: string;
}

const CertificateSchema: Schema = new Schema({
    title: { type: String, required: true },
    organization: { type: String, required: true },
    year: { type: Number, required: true },
    certificateUrl: { type: String, default: "" },
});

export const Certificate: Model<ICertificate> = mongoose.models.Certificate || mongoose.model<ICertificate>("Certificate", CertificateSchema);
