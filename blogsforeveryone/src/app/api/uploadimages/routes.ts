import Images from "@/models/Images";
import { NextResponse } from "next/server";

const uploadImages = async (image:string, postId:string)=>{
    
    const images = new Images({image,postId})
    await images.save();

    return NextResponse.json({
        message: "Images uploaded successfully",
    },{
        status: 200
    })

    
}

export default uploadImages;