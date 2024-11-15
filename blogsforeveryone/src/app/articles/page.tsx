// src/app/articles/page.tsx
"use client"
import { useEffect, useState } from 'react';

interface Article {
    title: string;
    description: string;
    url: string;
    source: { name: string };
    published_at: string; // Ensure this matches your Article interface
}

const ArticlesPage = () => {
    const [articles, setArticles] = useState<Article[]>([]);

    useEffect(() => {
        const fetchArticles = async () => {
            const response = await fetch('/api/articles');
            const data = await response.json();
            setArticles(data);
        };

        fetchArticles();
    }, []);

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Latest Articles</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {articles.map((article, index) => (
                    <div key={index} className="bg-white rounded-lg shadow p-4">
                        <h2 className="text-lg font-semibold">{article.title}</h2>
                        <p className="text-gray-700">{article.description}</p>
                        <a href={article.url} target="_blank" rel="noopener noreferrer" className="text-blue-500">
                            Read more
                        </a>
                        <p className="text-gray-500">Source: {article.source.name}</p>
                        <p className="text-gray-400">Published at: {new Date(article.published_at).toLocaleString()}</p>
                    </div>
                ))}
            </div>
        </div>
 );
};

export default ArticlesPage;