"use client"
import { fetchblogs } from '@/store/features/blogsSlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import React, { useEffect } from 'react';
import Link from 'next/link'; // Import Link from next/link

const Blogs = () => {
    const dispatch = useAppDispatch();
    const blogs = useAppSelector(state=>state.blogs.blogs);

    useEffect(() => {
        dispatch(fetchblogs());
    }, [dispatch]);

    // Check if blogs is an array before mapping
    if (!Array.isArray(blogs)) {
        return <div className="text-center py-10">Loading...</div>; // Center loading message
    }

    // Function to truncate content
    const truncateContent = (content: string, length: number = 100) => {
        if (content.length > length) {
            return content.substring(0, length) + '...'; // Append ellipsis if truncated
        }
        return content;
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-center mb-6">Blogs</h1>
            {blogs.length === 0 ? (
                <p className="text-center text-gray-500">No blogs available.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {blogs.map((blog, index) => (
                        <div key={index} className="bg-white shadow-md rounded-lg p-6">
                            <h2 className="text-xl font-semibold mb-2">{blog.title}</h2>
                            <p className="text-gray-700">{truncateContent(blog.content, 100)}</p>
                            <Link href={`/blogs/${blog._id}`} passHref>
                                <button 
                                    className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                                >
                                    Read More
                                </button>
                            </Link>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Blogs;