import dbConnect from "@/lib/mongoose";
import BlogsPost from "@/models/BlogsPost";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await dbConnect();
    const categories = await BlogsPost.distinct("category");
    return NextResponse.json(
      {
        categories,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      message: error,
    });
  }
}
