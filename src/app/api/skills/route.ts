import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import Skill from "@/models/Skill";

export async function GET() {
    try {
        await connectToDatabase();
        const skills = await Skill.find({}).sort({ order: 1, proficiencyLevel: -1 });
        return NextResponse.json(skills);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch skills" }, { status: 500 });
    }
}
