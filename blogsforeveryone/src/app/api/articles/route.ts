// src/app/api/articles/route.ts
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongoose'; // Adjust the import path as needed
import Article from '@/models/Article'; // Adjust the import path as needed



export async function GET() {
    try {
        // Connect to MongoDB
        await dbConnect();

        const allArticles = await Article.find({})


        return NextResponse.json(allArticles);
    } catch (error) {
        console.error('Error fetching articles:', error);
        return NextResponse.json({ error: 'Failed to fetch articles' }, { status: 500 });
    }
}