import mongoose, { Schema, Document, Model } from "mongoose";

export interface IService extends Document {
    title: string;
    description: string;
    icon: string;
    status: boolean;
    createdAt: Date;
}

const ServiceSchema: Schema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    icon: { type: String, required: true }, // Ideally an SVG string or icon name
    status: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now },
});

export const Service: Model<IService> = mongoose.models.Service || mongoose.model<IService>("Service", ServiceSchema);
