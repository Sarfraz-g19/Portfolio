import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import Experience from "@/models/Experience";
import { checkAdmin, unauthorizedResponse } from "@/lib/auth";

export async function GET() {
  await connectToDatabase();
  const exp = await Experience.find({}).sort({ createdAt: -1 });
  return NextResponse.json(exp);
}

export async function POST(req: NextRequest) {
  if (!await checkAdmin()) return unauthorizedResponse();

  await connectToDatabase();
  const body = await req.json();
  const exp = await Experience.create(body);
  return NextResponse.json(exp, { status: 201 });
}

export async function DELETE(req: NextRequest) {
  if (!await checkAdmin()) return unauthorizedResponse();

  await connectToDatabase();
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  await Experience.findByIdAndDelete(id);
  return NextResponse.json({ success: true });
}
