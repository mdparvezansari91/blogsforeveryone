// src/app/api/profile/route.ts
import { NextResponse, NextRequest } from "next/server";
import User from "@/models/User";
import dbConnect from "@/lib/mongoose";

export async function POST(req: NextRequest) {
  try {
    await dbConnect();

    const userHeader = req.headers.get(`x-user`);

    if (!userHeader) {
      return NextResponse.json({ error: "User not found" }, { status: 401 });
    }

    const userId = JSON.parse(userHeader);
    const user = await User.findById(userId.id).exec(); // Add .exec() here

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ url: req.url, user }, { status: 200 });
  } catch (error) {
    console.error("Profile API Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  } 
}
