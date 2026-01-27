import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import Message from "@/models/Message";

export async function POST(req: NextRequest) {
    try {
        await connectToDatabase();
        const body = await req.json();

        // Basic validation
        if (!body.name || !body.email || !body.message) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        const newMessage = await Message.create(body);

        // TODO: Email sending logic (Nodemailer) could go here if env vars exist
        // For now, we just save to DB as requested for the MVP/Admin panel view

        return NextResponse.json({ success: true, data: newMessage }, { status: 201 });
    } catch (error) {
        console.error("Contact Error:", error);
        return NextResponse.json({ error: "Failed to send message" }, { status: 500 });
    }
}
