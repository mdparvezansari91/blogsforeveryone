// src/app/api/articles/fetch.ts
import { NextResponse } from 'next/server';
import axios from 'axios';
import dbConnect from '@/lib/mongoose';
import Article, { IArticle } from '@/models/Article';

const MEDIA_STACK_API = process.env.MEDIA_STACK_API;

export async function GET() {
    try {
        // Connect to MongoDB
        await dbConnect();

        // Fetch articles from Mediastack
        const response = await axios.get('http://api.mediastack.com/v1/news', {
            params: {
                access_key: MEDIA_STACK_API,
                limit: 100, // Example: limit results
            },
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
        // Insert articles into the database
        await Article.insertMany(transformedArticles);
        await Article.deleteMany({$or:[{image:"no image"},{category:"no category"},{language:"no language"},{country:"no country"},{author:"no author"},{title:"no title"}]})
        
        const findDuplicates = async () => {
            const duplicates = await Article.aggregate([
                {
                    $group: {
                        _id: { title: "$title" }, // Group by title
                        count: { $sum: 1 }, // Count the number of occurrences
                        ids: { $push: "$_id" } // Store the IDs of the duplicate documents
                    }
                },
                {
                    $match: {
                        count: { $gt: 1 } // Only keep groups that have more than 1 occurrence
                    }
                }
            ]);
        
            return duplicates;
        };
        const removeDuplicates = async () => {
            const duplicates = await findDuplicates();
        
            for (const duplicate of duplicates) {
                const idsToDelete = duplicate.ids.slice(1); // Keep the first one, delete the rest
                await Article.deleteMany({ _id: { $in: idsToDelete } });
            }
        };

        const cleanup = async () => {
            try {
                await removeDuplicates();
                console.log('Duplicates removed successfully.');
            } catch (error) {
                console.error('Error removing duplicates:', error);
            }
        };

        cleanup()

        

        return NextResponse.json({ message: 'Articles fetched and saved successfully' });
    } catch (error) {
        console.error('Error fetching articles:', error);
        return NextResponse.json({ error: 'Failed to fetch articles' }, { status: 500 });
    }
}