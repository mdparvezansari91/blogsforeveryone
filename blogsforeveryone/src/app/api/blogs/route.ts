import dbConnect from "@/lib/mongoose";
import BlogsPost from "@/models/BlogsPost";

import { NextResponse } from "next/server"

export async function GET(){
    try {
        console.log("get all blogs")

        await dbConnect();
        const blogs = await BlogsPost.find({}) 
        return NextResponse.json({
            blogs,
        },{
            status:200
        })
        
    } catch (error) {
        return NextResponse.json({
            message:error

        },{
            status:400
        })
    }
}