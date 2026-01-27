import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import Experience from "@/models/Experience";

export async function GET() {
    try {
        await connectToDatabase();
        const experience = await Experience.find({}).sort({ order: 1, createdAt: -1 });
        return NextResponse.json(experience);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch experience" }, { status: 500 });
    }
}
