// src/app/api/signup/route.ts
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongoose';
import User from '@/models/User';
import bcrypt from 'bcrypt';

export async function POST(req: Request) {
    try {
        await dbConnect();
        const body = await req.json();

        const { name, email, password } = body;

        if (!name || !email || !password) {
            return NextResponse.json({
                message: "Name, email, and password are required",
            }, {
                status: 401,
            });
        }

        // Check if user already exists
        const existingUser  = await User.findOne({ email });
        if (existingUser ) {
            return NextResponse.json({
                message: 'User  already exists',
            }, { status: 409 });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds

        // Create new user with hashed password
        await User.create({ name, email, password: hashedPassword });

        return NextResponse.json({
            message: 'User  created successfully',
        });
    } catch (error) {
        console.error({ "signup/route.ts_Error": error });
        return NextResponse.json({
            message: 'Error creating user',
        });
    }
}