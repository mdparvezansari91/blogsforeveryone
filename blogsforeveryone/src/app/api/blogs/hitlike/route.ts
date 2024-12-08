import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongoose";
import BlogsPost from "@/models/BlogsPost";

interface User {
    id: string;
    email: string;
    iat: number;
    exp: number;
}

export async function POST(req: Request) {

    try {
        const body = await req.json();
        const userHeader = req.headers.get("x-user");

        // Parse the user header as JSON
        if (!userHeader) {
            return new Response("Unauthorized", { status: 401 });
        }

        const user: User = JSON.parse(userHeader); // Parse the header to get user object
        const userId = user.id; // Now this will correctly reference the 'id' property

        // Connect to the database
        await dbConnect();

        // Find the blog post by ID
        const blogPost = await BlogsPost.findById(body.blogid);
        if (!blogPost) {
            return NextResponse.json({ message: "Blog post not found" }, { status: 404 });
        }

        // Check if user ID is valid
        if (!userId) {
            return NextResponse.json({ message: "User  not authenticated" }, { status: 401 });
        }

        // Prevent duplicate likes
        if (blogPost.likes.includes(userId)) {
            // Remove the user ID from likes
            blogPost.likes = blogPost.likes.filter((id: string) => id.toString() !== userId);
            await blogPost.save(); // Save the changes
            return NextResponse.json({
                message: "User  unliked the post",
                likesCount: blogPost.likes.length, // Optionally return the updated like count
            });
        }

        // Add user ID to likes
        blogPost.likes.push(userId);
        await blogPost.save();

        return NextResponse.json({
            message: "Like button clicked",
            likesCount: blogPost.likes.length, // Optionally return the updated like count
        });
    } catch (error) {
        console.error("Error liking blog post:", error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}