import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongoose';
import User from '@/models/User';

export async function POST(req: Request){
    try {
        await dbConnect();
        const body = await req.json()

        const {email,password} = body
        
        console.log(email)
        if(!email || !password){
            return NextResponse.json({
                message:"email and Password are required"
            },
        {
            status:401
        })

        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return NextResponse.json({
                message: 'User already exists',
            }, { status: 409 });
        }

        // Create new user
        await User.create(body);
        // Update the user's profile

        return NextResponse.json({
            message: 'User created successfully',
    
        },{
        })
    } catch (error) {
        console.error({
            "signup/route.ts_Error":error
        })
        return NextResponse.json({
            
            message: 'Error creating user',

        })
    }
}