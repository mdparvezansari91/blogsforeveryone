'use client'
import axios from 'axios';
import Image from 'next/image';
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
    const [data, setData] = useState<PostData|null>(null);

    const getSinglePost = useCallback(async () => {
        const response = await axios.get(`/api/posts/${id}`);
        setData(response.data.posts);
        console.log(response.data.posts);
    }, [id]);

    useEffect(() => {
        getSinglePost();
    }, [getSinglePost]);

    return (
        <div className='mx-40 mt-10 border rounded-lg p-10'>
            <div className='flex justify-center items-center p-1 rounded-lg'>
                {data?.headerimage && (
                    <Image
                    className='rounded-lg' 
                    src={data.headerimage} 
                    alt="Post Header Image" 
                    width={300} // Set appropriate width
                    height={100} // Set appropriate height
                    layout="responsive" // Optional: Use layout prop if needed
                />
                )}
            </div>
            <div className=' text-center font-bold text-3xl p-10 '>
                {data?.title}
            </div>
            <div className="content flex flex-col justify-center" dangerouslySetInnerHTML={{ __html: data?.content || '' }} />
           
        </div>
    );
}

export default Page;