'use client';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface Posts {
    _id: number;
    title: string;
    headerimage: string;
}


const Posts = () => {
    const [editorContent, setEditorContent] = useState<Posts[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchPosts = async () => {
        try {
            const response = await axios.get("/api/posts");
            setEditorContent(response.data.posts); // Access the posts array
            setLoading(false);
        } catch (error) {
            setError('Failed to fetch posts');
            setLoading(false);
            console.error(error);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);
    
    if (loading) {
        return <div className='mx-auto p-10 text-lg font-bold'>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className=" justify-center p-4 gap-10 flex flex-wrap">
            {editorContent.length === 0 ? (
                <div>No posts available.</div>
            ) : (
                editorContent.map((post) => (
                    <div  key={post._id} className="border p-4 mb-4 rounded shadow w-80 flex flex-col">
                        <Link href={`/posts/${post._id}`}>
                        
                        {post.headerimage && <Image width={300} height={300} src={post.headerimage} alt="Header" className="mb-2 w-full h-40 object-cover " />}
                        <h2 className="font-bold text-xl flex-grow">{post.title}</h2>
                        <div><p>Like</p></div>
                        </Link>
                    </div>
                ))
            )}
        </div>
    );
};

export default Posts;