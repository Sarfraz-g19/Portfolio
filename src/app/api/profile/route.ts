import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import Profile from "@/models/Profile";

export async function GET() {
    try {
        await connectToDatabase();
        const profile = await Profile.findOne({});
        return NextResponse.json(profile);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch profile" }, { status: 500 });
    }
}
