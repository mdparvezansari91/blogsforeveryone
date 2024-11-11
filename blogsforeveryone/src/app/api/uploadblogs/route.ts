import dbConnect, { disconnectDB } from "@/lib/mongoose";
import BlogsPost from "@/models/BlogsPost";

import { NextRequest, NextResponse } from "next/server"

export async function POST(req:NextRequest){
    try {

        const body = await req.json();

        console.log(body)
        await dbConnect();
        await BlogsPost.create(body)
        await disconnectDB();
        return NextResponse.json({
            message: "Blog Created"
        })
        
    } catch (error) {
        return NextResponse.json({
            message:error

        })
    }
}