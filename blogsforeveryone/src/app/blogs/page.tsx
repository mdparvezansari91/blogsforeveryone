// pages/blogs/index.tsx
"use client";
import { fetchblogs, hitlike } from '@/store/features/blogsSlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { FaEdit, FaTrash, FaRegComment } from 'react-icons/fa'; // Import icons
import Head from 'next/head';

import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { profile } from '@/store/features/auth/authSlice';

const Blogs = () => {
    const dispatch = useAppDispatch();
    const blogs = useAppSelector(state => state.blogs.blogs);
    const user = useAppSelector(state=>state.auth.user)

    console.log(user)
    const [comments, setComments] = useState<{ [key: string]: string[] }>({});
    const [visibleComments, setVisibleComments] = useState<{ [key: string]: boolean }>({}); // State to track visibility of comments


    const handlelike = (id: string) => {

        dispatch(hitlike(id))

    }




    useEffect(() => {
        dispatch(fetchblogs());
        dispatch(profile())
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

    // Function to handle adding comments
    const handleAddComment = (blogId: string, comment: string) => {
        setComments(prev => ({
            ...prev,
            [blogId]: [...(prev[blogId] || []), comment]
        }));
    };

    // Function to handle deleting a blog
    const handleDeleteBlog = (blogId: string) => {
        // Implement delete functionality here (e.g., dispatch an action to delete the blog)
        console.log(`Delete blog with ID: ${blogId}`);
    };

    // Function to handle editing a blog
    const handleEditBlog = (blogId: string) => {
        // Implement edit functionality here (e.g., navigate to an edit page)
        console.log(`Edit blog with ID: ${blogId}`);
    };

    // Function to toggle comments visibility
    const toggleCommentsVisibility = (blogId: string) => {
        setVisibleComments(prev => ({
            ...prev,
            [blogId]: !prev[blogId] // Toggle visibility
        }));
    };

    return (
        <>
            <Head>
                <title>Shop and Blogs</title>
                <meta name="description" content="Explore our latest blogs on various topics. Read, comment, and engage with our community." />
                <link rel="canonical" href="https://yourwebsite.com/blogs" />
                {/* Structured Data for Blog List */}
                <script type="application/ld+json">
                    {JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "Blog",
                        "name": "My Website Blogs",
                        "description": "Explore our latest blogs on various topics.",
                        "blogPost": blogs.map(blog => ({
                            "@type": "BlogPosting",
                            "headline": blog.title,
                            "description": truncateContent(blog.content, 150),
                            "url": `https://www.shopnblog.online/blogs/${blog._id}`,
                            "datePublished": blog.createdAt,
                            "author": {
                                "@type": "Person",
                                "name": "Author Name" // Replace with actual author name if available
                            }
                        }))
                    })}
                </script>
            </Head>
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold text-center mb-6">Blogs</h1>
                {blogs.length === 0 ? (
                    <p className="text-center text-gray-500">No blogs available.</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {blogs.map((blog) => (
                            <article key={blog._id} className="bg-white shadow-md rounded-lg p-6 relative">
                                {/* Edit Icon positioned in the top right corner */}
                                <button
                                    onClick={() => handleEditBlog(blog._id)}
                                    className="absolute top-2 right-2 text-yellow-500"
                                >
                                    <FaEdit />
                                </button>

                                <h2 className="text-xl font-semibold mb-2">{blog.title}</h2>
                                <p className="text-gray-700">{truncateContent(blog.content, 100)}</p>

                                {/* Like/Dislike Icons */}
                                <div className="flex items-center mt-4">
                                    <p className='mr-1'>{blog.likes.length}</p>
                                    <button onClick={() => handlelike(blog._id)} className="text-blue-500 mr-4">
                                    {blog.likes.includes(user?._id?? "") ? <AiFillHeart /> : <AiOutlineHeart />}
                                    </button>
                                    
                                    <p className='mr-1'>{blog.comments.length}</p>
                                    <button className="text-red-900" onClick={() => toggleCommentsVisibility(blog._id)}>
                                        <FaRegComment />
                                    </button>
                                </div>

                                {/* Comments Section */}
                                {visibleComments[blog._id] && ( // Show comments only if visible
                                    <div className="mt-4">
                                        <h3 className="font-semibold">Comments:</h3>
                                        <div className="flex flex-col mt-2">
                                            {(comments[blog._id] || []).map((comment, index) => (
                                                <p key={index} className="text-gray-600">{comment}</p>
                                            ))}
                                        </div>
                                        <input
                                            type="text"
                                            placeholder="Add a comment..."
                                            className="border rounded px-2 py-1 mt-2 w-full"
                                            onKeyDown={(e) => {
                                                if (e.key === 'Enter' && e.currentTarget.value) {
                                                    handleAddComment(blog._id, e.currentTarget.value);
                                                    e.currentTarget.value = ''; // Clear input after adding
                                                }
                                            }}
                                        />
                                    </div>
                                )}

                                {/* Delete Icon positioned in the bottom right corner */}
                                <button
                                    onClick={() => handleDeleteBlog(blog._id)}
                                    className="absolute bottom-2 right-2 text-red-500"
                                >
                                    <FaTrash />
                                </button>

                                <Link href={`/blogs/${blog._id}`} passHref>
                                    <button
                                        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                                    >
                                        Read More
                                    </button>

                                </Link>
                            </article>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
}

export default Blogs;