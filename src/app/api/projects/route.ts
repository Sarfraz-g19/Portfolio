import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import Project from "@/models/Project";

export async function GET() {
    try {
        await connectToDatabase();
        const projects = await Project.find({}).sort({ order: 1, createdAt: -1 });
        return NextResponse.json(projects);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch projects" }, { status: 500 });
    }
}
