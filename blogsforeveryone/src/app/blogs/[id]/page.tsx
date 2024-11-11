// pages/blogs/[id].tsx
"use client";
import { fetchclickedblog } from "@/store/features/detailsBlogSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect } from "react";

const BlogDetail = () => {
    const params = useParams<{ id: string }>();
    const { id } = params;
    const dispatch = useAppDispatch();
    const detailedBlog = useAppSelector(state => state.detailedblogs.blog); // Access the single blog

    useEffect(() => {
        const fetchProduct = async () => {
            if (id) {
                await dispatch(fetchclickedblog(id));
            }
        };
        fetchProduct();
    }, [id, dispatch]);

    console.log('detailedBlog:', detailedBlog); // Debugging line

    return (
        <div className="max-w-3xl mx-auto p-4">
            {detailedBlog ? ( // Check if detailedBlog is not null
                <div className="bg-white shadow-lg rounded-lg p-6">
                    <h1 className="text-3xl font-bold mb-4">{detailedBlog.title}</h1>
                    <p className="text-gray-700 mb-4">{detailedBlog.content}</p>
                    {/* Optional: Add a button or link to go back */}
                    <Link href="/blogs" className="text-blue-500 hover:underline">Back to Blogs</Link>
                </div>
            ) : (
                <p className="text-center text-gray-500">Loading blog details...</p>
            )}
        </div>
    );
}

export default BlogDetail;