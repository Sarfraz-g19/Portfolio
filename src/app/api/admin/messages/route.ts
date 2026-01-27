import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import Message from "@/models/Message";
import { checkAdmin, unauthorizedResponse } from "@/lib/auth";

export async function GET() {
    if (!await checkAdmin()) return unauthorizedResponse();
    await connectToDatabase();

    const messages = await Message.find({}).sort({ createdAt: -1 });
    return NextResponse.json(messages);
}

export async function DELETE(req: NextRequest) {
    if (!await checkAdmin()) return unauthorizedResponse();
    await connectToDatabase();

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });

    await Message.findByIdAndDelete(id);
    return NextResponse.json({ success: true });
}

export async function PATCH(req: NextRequest) {
    if (!await checkAdmin()) return unauthorizedResponse();
    await connectToDatabase();

    const body = await req.json();
    const { id, isRead } = body;

    const updated = await Message.findByIdAndUpdate(id, { isRead }, { new: true });
    return NextResponse.json(updated);
}
