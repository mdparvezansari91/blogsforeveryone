// src/app/api/articles/route.ts
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongoose'; // Adjust the import path as needed
import Article from '@/models/Article'; // Adjust the import path as needed

export async function GET(request: Request) {
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get('page') || '1', 10);
    const limit = parseInt(url.searchParams.get('limit') || '10', 10);
    const skip = (page - 1) * limit;

    try {
        // Connect to MongoDB
        await dbConnect();

        const totalArticles = await Article.countDocuments(); // Get total number of articles
        const articles = await Article.find({})
            .sort({ published_at: -1 }) // Sort by publishedAt in descending order (latest first)
            .skip(skip)
            .limit(limit);

        return NextResponse.json({ articles, totalPages: Math.ceil(totalArticles / limit) });
    } catch (error) {
        console.error('Error fetching articles:', error);
        return NextResponse.json({ error: 'Failed to fetch articles' }, { status: 500 });
    }
}