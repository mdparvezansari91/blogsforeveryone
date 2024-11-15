// src/app/api/articles/route.ts
import { NextResponse } from 'next/server';
import axios from 'axios';
import dbConnect from '@/lib/mongoose'; // Adjust the import path as needed
import Article, { IArticle } from '@/models/Article'; // Adjust the import path as needed

const MEDIA_STACK_API = process.env.MEDIA_STACK_API;

export async function GET() {
    try {
        // Connect to MongoDB
        await dbConnect();

        // Fetch articles from Mediastack
        const response = await axios.get('http://api.mediastack.com/v1/news', {
            params: {
                access_key: MEDIA_STACK_API,
                
                limit: 6 // Example: limit results
            }
        });

        const articles: IArticle[] = response.data.data;

        // Transform articles to match the schema
        const transformedArticles = articles.map((article) => ({
            title: article.title || "No title",
            description: article.description || "",
            url: article.url || "",
            source: { name: article.source || "" }, // This should match the schema
            published_at: article.published_at ? new Date(article.published_at) : new Date(), // Default to current date if missing
            author: article.author || "no author",
            image: article.image || "no image",
            category: article.category || "no category",
            language: article.language || "no language",
            country: article.country || " no country",
        }));

        await Article.insertMany(transformedArticles);

        const allArticles = await Article.find({})


        return NextResponse.json(allArticles);
    } catch (error) {
        console.error('Error fetching articles:', error);
        return NextResponse.json({ error: 'Failed to fetch articles' }, { status: 500 });
    }
}