import dbConnect from "@/lib/mongoose";
import Posts from "@/models/Posts";
import { NextResponse } from "next/server";

export async function GET() {
  await dbConnect();

  const posts = await Posts.find().sort({ createdAt: -1 });
  // Check if posts are found
  return NextResponse.json(
    {
      posts,
    },
    {
      status: 200,
    }
  );
}
