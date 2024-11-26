// pages/blogs/[id].tsx
"use client";
import { fetchclickedblog } from "@/store/features/detailsBlogSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Head from 'next/head';
import ShareButtons from "@/components/ShareButtons";

const BlogDetail = () => {
    const params = useParams<{ id: string }>();
    const { id } = params;
    const dispatch = useAppDispatch();
    const [currentUrl, setCurrentUrl] = useState('');
    const detailedBlog = useAppSelector(state => state.detailedblogs.blog); // Access the single blog

    useEffect(() => {
        const fetchProduct = async () => {
            if (id) {
                await dispatch(fetchclickedblog(id));
            }
        };
        fetchProduct();
    }, [id, dispatch]);

    useEffect(() => {
        // Set the current URL for sharing
        if (id) {
            const url = `${window.location.origin}/blogs/${id}`;
            setCurrentUrl(url);
        }
    }, [id]);

    console.log('detailedBlog:', detailedBlog); // Debugging line

    return (
        <>
            <Head>
                <title>{detailedBlog ? detailedBlog.title : 'Loading...'}</title>
                <meta name="description" content={detailedBlog ? detailedBlog.content.substring(0, 150) : 'Loading blog details...'} />
                <link rel="canonical" href={currentUrl} />
                {/* Open Graph tags for social media sharing */}
                {detailedBlog && (
                    <>
                        <meta property="og:title" content={detailedBlog.title} />
                        <meta property="og:description" content={detailedBlog.content.substring(0, 150)} />
                        <meta property="og:url" content={currentUrl} />
                        {/* If you have an image, you can add it here */}
                        {/* <meta property="og:image" content={detailedBlog.imageUrl} /> */}
                    </>
                )}
            </Head>
            <div className="max-w-3xl mx-auto p-4">
                {detailedBlog ? ( // Check if detailedBlog is not null
                    <article className="bg-white shadow-lg rounded-lg p-6">
                        <h1 className="text-3xl font-bold mb-4">{detailedBlog.title}</h1>
                        <p className="text-gray-700 mb-4">{detailedBlog.content}</p>
                        {/* Pass the dynamic URL to ShareButtons */}
                        <ShareButtons url={currentUrl} title={detailedBlog.title} />
                        <Link href="/blogs" className="text-blue-500 hover:underline">Back to Blogs</Link>
                    </article>
                ) : (
                    <p className="text-center text-gray-500">Loading blog details...</p>
                )}
            </div>
        </>
    );
}

export default BlogDetail;