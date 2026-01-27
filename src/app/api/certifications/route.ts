import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import Certification from "@/models/Certification";

export async function GET() {
    try {
        await connectToDatabase();
        const certifications = await Certification.find({}).sort({ date: -1 });
        return NextResponse.json(certifications);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch certifications" }, { status: 500 });
    }
}
