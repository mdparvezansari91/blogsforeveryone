"use client"
import { fetchembeddedvideos } from '@/store/features/embeddedVideosSlice';
import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import Image from 'next/image';

const VideoList = () => {
    const dispatch = useAppDispatch();
    const { videos, status, error } = useAppSelector(state => state.embeddedVideos);
    const [selectedVideoId, setSelectedVideoId] = useState<string | null>(null);

    useEffect(() => {
        dispatch(fetchembeddedvideos());
    }, [dispatch]);

    if (status === 'loading') {
        return <div>Loading...</div>;
    }

    if (status === 'failed') {
        return <div>Error: {error}</div>;
    }

    const handleVideoClick = (videoId: string) => {
        setSelectedVideoId(videoId);
    };

    const handleCloseVideo = () => {
        setSelectedVideoId(null);
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
            {videos.map((video) => (
                <div key={video._id} className="bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="p-4">
                        <h2 className="text-lg font-bold">{video.title}</h2>
                        <Image
                            src={video.thumbnail}
                            alt={video.title}
                            width={320}
                            height={180}
                            className="w-full h-auto cursor-pointer"
                            onClick={() => handleVideoClick(video.videoId)}
                        />
                        <button
                            onClick={() => handleVideoClick(video.videoId)}
                            className="text-blue-500 hover:underline mt-2"
                        >
                            Watch Video
                        </button>
                    </div>
                </div>
            ))}
            {selectedVideoId && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-lg p-4 relative">
                        <button
                            onClick={handleCloseVideo}
                            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                        >
                            &times;
                        </button>
                        <div className="relative" style={{ paddingBottom: '56.25%', height: 0 }}>
                            <iframe
                                className="absolute top-0 left-0 w-full h-full"
                                src={`https://www.youtube.com/embed/${selectedVideoId}`}
                                title="YouTube video player"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default VideoList;