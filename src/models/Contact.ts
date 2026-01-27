import mongoose, { Schema, Document, Model } from "mongoose";

export interface IContact extends Document {
    name: string;
    email: string;
    message: string;
    type: 'contact' | 'quote'; // To distinguish between contact form and quote requests
    createdAt: Date;
}

const ContactSchema: Schema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    message: { type: String, required: true },
    type: { type: String, enum: ['contact', 'quote'], default: 'contact' },
    createdAt: { type: Date, default: Date.now },
});

export const Contact: Model<IContact> = mongoose.models.Contact || mongoose.model<IContact>("Contact", ContactSchema);
