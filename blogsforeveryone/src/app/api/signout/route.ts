import { NextResponse } from "next/server";

export async function POST() {
    try {
        // Create a response object
        const response = NextResponse.json({
            message: "Logout Successful",
        }, {
            status: 200,
        });

        // Clear the JWT token cookie
        response.cookies.set('token', '', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 0, // This makes the cookie expire immediately
            path: '/',
        });

        return response;

    } catch (error) {
        console.error({ "signout/route.ts": error });

        return NextResponse.json({
            message: "Error Occurred in Signout",
        }, {
            status: 400,
        });
    }
}