'use client';
import axios from 'axios';
import Image from 'next/image';
import Head from 'next/head';
import { useParams } from 'next/navigation';
import React, { useEffect, useState, useCallback } from 'react';


interface PostData {
    headerimage: string;
    title: string;
    content: string;
}

function Page() {
    const params = useParams<{ id: string }>();
    const { id } = params;
    const [data, setData] = useState<PostData | null>(null);

    const getSinglePost = useCallback(async () => {
        const response = await axios.get(`/api/posts/${id}`);
        setData(response.data.posts);
        console.log(response.data.posts);
    }, [id]);

    useEffect(() => {
        getSinglePost();
    }, [getSinglePost]);

    return (
        <>
            <Head>
                <title>{data?.title}</title>
                <meta name="description" content={data?.content.substring(0, 150) || 'Read this post to learn more.'} />
                <link rel="canonical" href={`https://shopnblog.online/posts/${id}`} />
                <script type="application/ld+json" dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "BlogPosting",
                        "headline": data?.title,
                        "image": data?.headerimage,
                        "articleBody": data?.content,
                        "author": {
                            "@type": "Person",
                            "name": "Parvez ansari" // Replace with actual author name
                        },
                        "datePublished": new Date().toISOString(), // Replace with actual publish date
                        "url": `https://shopnblog.online/posts/${id}`
                    })
                }} />
            </Head>
            <div className='mx-40 mt-10 border rounded-lg p-10'>
                <div className='flex justify-center items-center p-1 rounded-lg'>
                    {data?.headerimage && (
                        <Image
                            className='rounded-lg'
                            src={data.headerimage}
                            alt={`Image for ${data.title}`} // Descriptive alt text
                            width={300} // Set appropriate width
                            height={100} // Set appropriate height
                            layout="responsive" // Optional: Use layout prop if needed
                        />
                    )}
                </div>
                <h1 className='text-center font-bold text-3xl p-10'>
                    {data?.title}
                </h1>
                <div className="content flex flex-col justify-center" dangerouslySetInnerHTML={{ __html: data?.content || '' }} />
            </div>
        </>
    );
}

export default Page;