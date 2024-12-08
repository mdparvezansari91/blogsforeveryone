import dbConnect from "@/lib/mongoose";
import BlogsPost from "@/models/BlogsPost";
import { NextResponse } from "next/server";

export async function GET(req:Request, context:{params:Promise<{id:string}>}){
    try {
        await dbConnect()
        const {id} = await context.params;
        const blog = await BlogsPost.findById(id);

       return NextResponse.json({
        blog
        },{
            "status": 200,
        })
    } catch (error) {
        console.error(error);
        return NextResponse.json({
            message:error
        },{
            "status": 500,
        })
    }
}