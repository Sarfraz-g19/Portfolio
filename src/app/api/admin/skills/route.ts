import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import Skill from "@/models/Skill";
import { checkAdmin, unauthorizedResponse } from "@/lib/auth";

export async function GET() {
    await connectToDatabase();
    const skills = await Skill.find({}).sort({ category: 1, level: -1 });
    return NextResponse.json(skills);
}

export async function POST(req: NextRequest) {
    if (!await checkAdmin()) return unauthorizedResponse();

    await connectToDatabase();
    const body = await req.json();
    const skill = await Skill.create(body);
    return NextResponse.json(skill, { status: 201 });
}

export async function PUT(req: NextRequest) {
    if (!await checkAdmin()) return unauthorizedResponse();

    await connectToDatabase();
    const body = await req.json();
    const { _id, ...updateData } = body;
    const skill = await Skill.findByIdAndUpdate(_id, updateData, { new: true });
    return NextResponse.json(skill);
}

export async function DELETE(req: NextRequest) {
    if (!await checkAdmin()) return unauthorizedResponse();

    await connectToDatabase();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    await Skill.findByIdAndDelete(id);
    return NextResponse.json({ success: true });
}
