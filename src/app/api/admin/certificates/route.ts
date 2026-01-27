import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import Certification from "@/models/Certification";
import { checkAdmin, unauthorizedResponse } from "@/lib/auth";

export async function GET() {
    await connectToDatabase();
    const certs = await Certification.find({}).sort({ year: -1 });
    return NextResponse.json(certs);
}

export async function POST(req: NextRequest) {
    if (!await checkAdmin()) return unauthorizedResponse();

    await connectToDatabase();
    const body = await req.json();
    const cert = await Certification.create(body);
    return NextResponse.json(cert, { status: 201 });
}

export async function DELETE(req: NextRequest) {
    if (!await checkAdmin()) return unauthorizedResponse();

    await connectToDatabase();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    await Certification.findByIdAndDelete(id);
    return NextResponse.json({ success: true });
}
