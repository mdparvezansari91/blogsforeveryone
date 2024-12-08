import { NextRequest, NextResponse } from "next/server"
import Posts from "@/models/Posts"
import dbConnect from "@/lib/mongoose"


export async function POST(req:NextRequest){
    await dbConnect()
    const q = await req.json()
    const post = new Posts({content:q.editorContent, headerimage:q.image, title:q.title})
    console.log(post)
    await post.save()

    return NextResponse.json({
        success:true, 
        message: "Post successful" },{status:200})
}