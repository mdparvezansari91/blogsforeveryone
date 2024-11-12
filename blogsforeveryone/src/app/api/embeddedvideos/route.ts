import dbConnect from "@/lib/mongoose";
import EmbeddedVideos from "@/models/EmbeddedVideos";

import { NextResponse } from "next/server"

export async function GET(){
    try {
        console.log("get all videos")

        await dbConnect();
        const embeddedvideos = await EmbeddedVideos.find({}) 
        return NextResponse.json({
            embeddedvideos,
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