import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import Project from "@/models/Project";
import { checkAdmin, unauthorizedResponse } from "@/lib/auth";

export async function GET() {
    await connectToDatabase();
    const projects = await Project.find({}).sort({ createdAt: -1 });
    return NextResponse.json(projects);
}

export async function POST(req: NextRequest) {
    if (!await checkAdmin()) return unauthorizedResponse();

    await connectToDatabase();
    const body = await req.json();
    const project = await Project.create(body);
    return NextResponse.json(project, { status: 201 });
}

export async function DELETE(req: NextRequest) {
    if (!await checkAdmin()) return unauthorizedResponse();

    await connectToDatabase();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    await Project.findByIdAndDelete(id);
    return NextResponse.json({ success: true });
}
