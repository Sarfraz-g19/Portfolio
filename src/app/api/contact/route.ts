import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import Message from "@/models/Message";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
    try {
        await connectToDatabase();
        const body = await req.json();

        // Basic validation
        if (!body.name || !body.email || !body.message) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        const newMessage = await Message.create(body);

        // Send email to admin using Nodemailer
        if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
            const transporter = nodemailer.createTransport({
                service: "gmail",
                auth: {
                    user: process.env.EMAIL_USER,
                    pass: process.env.EMAIL_PASS,
                },
            });

            const mailOptions = {
                from: process.env.EMAIL_USER,
                to: "mohammadsarfraj2001@gmail.com",
                replyTo: body.email,
                subject: `New Portfolio Message from ${body.name}`,
                text: `You have received a new message from your portfolio website!\n\nName: ${body.name}\nEmail: ${body.email}\n\nMessage:\n${body.message}`,
            };

            await transporter.sendMail(mailOptions);
        } else {
            console.warn("Nodemailer setup skipped: EMAIL_USER or EMAIL_PASS missing from ENV.");
        }

        return NextResponse.json({ success: true, data: newMessage }, { status: 201 });
    } catch (error) {
        console.error("Contact Error:", error);
        return NextResponse.json({ error: "Failed to send message" }, { status: 500 });
    }
}
