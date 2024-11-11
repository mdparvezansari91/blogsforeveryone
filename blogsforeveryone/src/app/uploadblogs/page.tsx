"use client";
import axios from 'axios';
import Link from 'next/link';
import React, { useState } from 'react';

const BlogUploader: React.FC = () => {
    // State to hold form data
    const [data, setData] = useState({
        title: '',
        content: '',
    });

    // Handle input changes
    const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Handle form submission
    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // Prevent default form submission
        try {
            const response = await axios.post("/api/uploadblogs", data);
            console.log(response.data); // Log the response data
            // Optionally, reset the form or show a success message here
            setData({ title: '', content: '' }); // Reset form fields
        } catch (error) {
            console.error("Error uploading blog post:", error);
            // Optionally, show an error message to the user
        }
    };

    return (
        <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-bold text-center mb-6">Upload Your Blog Post</h2>
            <form onSubmit={onSubmit}>
                <div>
                    <label htmlFor="title" className="block text-gray-700 font-semibold mb-2">Title</label>
                    <input
                        type="text"
                        name="title"
                        value={data.title} // Bind value to state
                        onChange={onChange} // Handle changes
                        className="border border-gray-300 rounded w-full p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>
                <div className="mt-4">
                    <label htmlFor="content" className="block text-gray-700 font-semibold mb-2">Content</label>
                    <textarea
                        name="content"
                        value={data.content} // Bind value to state
                        onChange={onChange} // Handle changes
                        className="border border-gray-300 rounded w-full p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        rows={6}
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="mt-6 w-full bg-blue-500 text-white rounded p-3 hover:bg-blue-600 transition duration-200"
                >
                    Upload Post
                </button>
                <Link href='/blogs'
                    className="mt-4 inline-block text-center w-full bg-gray-300 text-gray-700 rounded p-3 hover:bg-gray-400 transition duration-200"
                >
                    Back to Home
                </Link>
            </form>
        </div>
    );
};

export default BlogUploader;