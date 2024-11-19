"use client";
import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import Link from 'next/link';
import Image from 'next/image';
import { fetchArticles, setCurrentPage, setCategoryFilter, setCountryFilter } from '@/store/features/articleSlice';

const ArticlesPage = () => {
    const dispatch = useAppDispatch();

    // Selectors to get the articles, current page, and total pages from Redux state
    const articles = useAppSelector((state) => state.articles.articles);
    const currentPage = useAppSelector((state) => state.articles.currentPage);
    const filterOptions = useAppSelector((state) => state.articles.filterOptions);
    const countryOptions = useAppSelector((state) => state.articles.countryOptions);
    const totalPages = useAppSelector((state) => state.articles.totalPages);
    const categoryFilter = useAppSelector((state) => state.articles.filter.category);
    const countryFilter = useAppSelector((state) => state.articles.filter.country);
    const status = useAppSelector((state) => state.articles.status); // Fetch status
    const limit = 12; // Number of articles per page

    // Fetch articles when the component mounts or when currentPage or filters change
    useEffect(() => {
        const filter = {
            category: categoryFilter,
            country: countryFilter,
        };
        dispatch(fetchArticles({ page: currentPage, limit, filter }));
    }, [currentPage, dispatch, categoryFilter, countryFilter]);

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

    // Handle category filter change
    const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedFilter = event.target.value;
        dispatch(setCategoryFilter(selectedFilter));
        dispatch(setCurrentPage(1)); // Reset to first page when filter changes
    };

    // Handle country filter change
    const handleCountryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedFilter = event.target.value;
        dispatch(setCountryFilter(selectedFilter));
        dispatch(setCurrentPage(1)); // Reset to first page when filter changes
    };

    const paginationRange = getPaginationRange();

    return (
        <div className="container mx-auto p-4">
            <div className='flex items-center mb-4 justify-between'>
                <h1 className="text-3xl font-bold text-gray-800">Latest Articles</h1>
                <h1 className='text-xl font-semibold text-gray-600'>{articles.length} Articles</h1>
            </div>
            <div className="mb-4 flex flex-col">
                <div className='flex bg-gray-200 rounded-lg p-4 shadow-md'>
                    <div className='mr-4'>
                        <label htmlFor="category-filter" className='mr-2 text-lg'>Filter by Categories:</label>
                        <select id="category-filter" className='p-2 border border-gray-300 rounded' onChange={handleCategoryChange} value={categoryFilter}>
                            <option value="">All</option>
                            {filterOptions.map((option) => (
                                <option key={option.id} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="country-filter" className='mr-2 text-lg'>Filter by Country:</label>
                        <select id="country-filter" className='p-2 border border-gray-300 rounded' onChange={handleCountryChange} value={countryFilter}>
                            <option value="">All</option>
                            {countryOptions.map((option) => (
                                <option key={option.id} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>
            {status === 'loading' && <p className="text-center text-lg">Loading articles...</p>}
            {status === 'failed' && <p className="text-center text-red-500">Failed to load articles. Please try again.</p>}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {articles.map((article) => (
                    <div key={article._id} className="bg-white rounded-lg shadow-lg p-4 transition-transform transform hover:scale-105">
                        <Image
                            src={article.image}
                            alt={article.title}
                            width={300}
                            height={200}
                            className="rounded-t-lg"
                        />
                        <h2 className="text-lg font-semibold mt-2">{article.title}</h2>
                        <p className="text-gray-700">{article.description}</p>
                        <a href={article.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                            Read more
                        </a>
                        <p className="text-gray-500 mt-2">Source: {article.source.name}</p>
                        <p className="text-gray-400">Published at: {new Date(article.published_at).toLocaleString()}</p>
                    </div>
                ))}
            </div>

            <div className="flex justify-center mt-6">
                <div className="flex items-center">
                    {currentPage > 1 && (
                        <Link href={`/articles?page=${currentPage - 1}`} onClick={() => dispatch(setCurrentPage(currentPage - 1))} className="mx-2 px-4 py-2 border border-blue-500 rounded text-blue-500 hover:bg-blue-500 hover:text-white transition">
                            Previous
                        </Link>
                    )}

                    {paginationRange.map((page) => (
                        <Link key={page} href={`/articles?page=${page}`} onClick={() => dispatch(setCurrentPage(page))} className={`mx-1 px-4 py-2 border rounded ${currentPage === page ? 'bg-blue-500 text-white' : 'bg-white text-blue-500'}`}>
                            {page}
                        </Link>
                    ))}

                    {currentPage < totalPages && (
                        <Link href={`/articles?page=${currentPage + 1}`} onClick={() => dispatch(setCurrentPage(currentPage + 1))} className="mx-2 px-4 py-2 border border-blue-500 rounded text-blue-500 hover:bg-blue-500 hover:text-white transition">
                            Next
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ArticlesPage;