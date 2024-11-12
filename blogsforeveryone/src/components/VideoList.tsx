"use client"
import { fetchembeddedvideos } from '@/store/features/embeddedVideosSlice';
import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';

const VideoList = () => {
    const dispatch = useAppDispatch();
    const { videos, status, error } = useAppSelector(state => state.embeddedVideos);

    useEffect(() => {
        dispatch(fetchembeddedvideos());
    }, [dispatch]);

    if (status === 'loading') {
        return <div>Loading...</div>;
    }

    if (status === 'failed') {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
            {videos.map((video) => (
                <div key={video._id} className="bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="p-4">
                        <h2 className="text-lg font-bold">{video.title}</h2>
                    </div>
                    <div className="p-4">
                        <a
                            href={`https://www.youtube.com/watch?v=${video.videoId}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 hover:underline"
                        >
                            Watch Video
                        </a>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default VideoList;