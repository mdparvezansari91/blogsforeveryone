import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongoose";
import User from "@/models/User";
import { SignJWT } from 'jose'; // Make sure to install jsonwebtoken package

export async function POST(req: Request) {
    try {
        await dbConnect();

        const body = await req.json();
        const { email, password } = body;

        // Find user by email and password
        const user = await User.findOne({ email });

        // Validate user credentials (you should hash and compare passwords in a real application)
        if (!user || user.password !== password) {
            return NextResponse.json({
                message: "Invalid Credentials",
            }, {
                status: 400,
            });
        }

        const jwtSecret = process.env.JWT_SECRET;

        if (!jwtSecret) {
            throw new Error("JWT_SECRET is not defined in environment variables");
        }

        // Generate JWT token
        const secret = new TextEncoder().encode(process.env.JWT_SECRET); // Ensure your secret is a Uint8Array

    const token = await new SignJWT({ id: user._id, email:user.email })
        .setProtectedHeader({ alg: 'HS256' }) // Specify the signing algorithm
        .setIssuedAt() // Set the issued at claim
        .setExpirationTime('1h') // Set the expiration time
        .sign(secret); // Sign the token with the secret

        // Set the JWT token as a cookie
        const response = NextResponse.json({
            message: "Login Successful",
        });


        // Set cookie with JWT token
        response.cookies.set('token', token, {
            httpOnly: true, // Prevents client-side JavaScript from accessing the cookie
            secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
            maxAge: 60 * 60, // 1 hour
            path: '/', // Cookie is accessible on the entire site
        });

        return response;

    } catch (error) {
        console.error({ "signin/route.ts": error });

        return NextResponse.json({
            message: "Error Occurred in Signin",
        }, {
            status: 400,
        });
    }
}