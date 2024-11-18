// src/app/articles/page.tsx
"use client";
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import Link from 'next/link';
import Image from 'next/image';
import { fetchArticles, setCurrentPage } from '@/store/features/articleSlice';

const ArticlesPage = () => {
    const dispatch = useAppDispatch();
    
    // Selectors to get the articles, current page, and total pages from Redux state
    const articles = useAppSelector((state) => state.articles.articles);
    const currentPage = useAppSelector((state) => state.articles.currentPage);
    const totalPages = useAppSelector((state) => state.articles.totalPages);
    const status = useAppSelector((state) => state.articles.status); // Fetch status
    const limit = 12; // Number of articles per page

    // Fetch articles when the component mounts or when currentPage changes
    useEffect(() => {
        dispatch(fetchArticles({ page: currentPage, limit }));
    }, [currentPage, dispatch]);

    // Calculate the range of page numbers to display
    const getPaginationRange = () => {
        const range = [];
        const start = Math.max(1, currentPage - 2);
        const end = Math.min(totalPages, currentPage + 2);

        for (let i = start; i <= end; i++) {
            range.push(i);
        }
        return range;
    };

    const paginationRange = getPaginationRange();

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Latest Articles</h1>
            {status === 'loading' && <p>Loading articles...</p>}
            {status === 'failed' && <p className="text-red-500">Failed to load articles. Please try again.</p>}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {articles.map((article) => (
                    <div key={article._id} className="bg-white rounded-lg shadow p-4">
                        <Image
                            src={article.image}
                            alt={article.title}
                            width={300}
                            height={200}
                        />
                        <h2 className="text-lg font-semibold">{article.title}</h2>
                        <p className="text-gray-700">{article.description}</p>
                        <a href={article.url} target="_blank" rel="noopener noreferrer" className="text-blue-500">
                            Read more
                        </a>
                        {/* Accessing the name property of the source object */}
                        <p className="text-gray-500">Source: {article.source.name}</p>
                        <p className="text-gray-400">Published at: {new Date(article.published_at).toLocaleString()}</p>
                    </div>
                ))}
            </div>

            <div className="flex justify-center mt-4">
                <div className="flex items-center">
                    {currentPage > 1 && (
                        <Link href={`/articles?page=${currentPage - 1}`} onClick={() => dispatch(setCurrentPage(currentPage - 1))} className="mx-2 px-3 py-1 border rounded text-blue-500 hover:bg-blue-500 hover:text-white">
                            Previous
                        </Link>
                    )}

                    {paginationRange.map((page) => (
                        <Link key={page} href={`/articles?page=${page}`} onClick={() => dispatch(setCurrentPage(page))} className={`mx-1 px-3 py-1 border rounded ${currentPage === page ? 'bg-blue-500 text-white' : 'bg-white text-blue-500'}`}>
                            {page}
                        </Link>
                    ))}

                    {currentPage < totalPages && (
                        <Link href={`/articles?page=${currentPage + 1}`} onClick={() => dispatch(setCurrentPage(currentPage + 1))} className="mx-2 px-3 py-1 border rounded text-blue-500 hover:bg-blue-500 hover:text-white">
                            Next
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ArticlesPage;