
import mongoose, { Schema, Document, Model } from "mongoose";

export interface IEducation extends Document {
    institution: string;
    degree: string;
    fieldOfStudy?: string;
    startDate: Date;
    endDate?: Date;
    current: boolean;
    grade?: string;
    description?: string;
    createdAt: Date;
    updatedAt: Date;
}

const EducationSchema: Schema = new Schema(
    {
        institution: { type: String, required: [true, "Institution is required"], trim: true },
        degree: { type: String, required: [true, "Degree is required"], trim: true },
        fieldOfStudy: { type: String, trim: true },
        startDate: { type: Date, required: [true, "Start date is required"] },
        endDate: { type: Date },
        current: { type: Boolean, default: false },
        grade: { type: String, trim: true },
        description: { type: String, trim: true },
    },
    {
        timestamps: true,
        collection: "education",
    }
);

export const Education: Model<IEducation> = mongoose.models.Education || mongoose.model<IEducation>("Education", EducationSchema);
