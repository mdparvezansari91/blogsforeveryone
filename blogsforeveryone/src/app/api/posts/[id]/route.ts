import dbConnect from "@/lib/mongoose";
import Posts from "@/models/Posts";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest){
    await dbConnect()

    const id = req.url.split("/").pop()
    const posts = await Posts.findById(id)

    return NextResponse.json({
        posts,
    },{
        status: 200
    })
}