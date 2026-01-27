import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const API_ADMIN_EMAIL = "mohammadsarfraj2001@gmail.com"; // Hardcoded for security as requested "One predefined account"

export async function checkAdmin() {
    const user = await currentUser();

    if (!user || !user.emailAddresses.some(e => e.emailAddress === API_ADMIN_EMAIL)) {
        return false;
    }
    return true;
}

export function unauthorizedResponse() {
    return NextResponse.json({ error: "Unauthorized Access. Admin Only." }, { status: 403 });
}
