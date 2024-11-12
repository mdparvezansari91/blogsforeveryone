// pages/api/videos.ts

import dbConnect from '@/lib/mongoose';
import EmbeddedVideos from '@/models/EmbeddedVideos';
import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    await dbConnect();

    try {
        const { url, title } = await req.json();
        const videoId = url.split('v=')[1]?.split('&')[0];

        // Validate videoId
        if (!videoId) {
            return NextResponse.json({ error: 'Invalid YouTube URL' }, { status: 400 });
        }

        // Fetch video details from YouTube API
        const response = await axios.get(`https://www.googleapis.com/youtube/v3/videos`, {
            params: {
                part: 'snippet,contentDetails,statistics',
                id: videoId,
                key: process.env.YOUTUBEAPI_KEY,
            },
        });

        // Check if the video details were returned
        if (!response.data.items || response.data.items.length === 0) {
            return NextResponse.json({ error: 'Video not found' }, { status: 404 });
        }

        const videoDetails = response.data.items[0].snippet;

        const newVideo = new EmbeddedVideos({
            videoId,
            title: title || videoDetails.title,
            description: videoDetails.description,
            // Use a higher resolution thumbnail
            thumbnail: videoDetails.thumbnails.maxres ? videoDetails.thumbnails.maxres.url : videoDetails.thumbnails.high.url,
            likes: 0, // Initialize likes
            comments: [], // Initialize comments
        });

        await newVideo.save();
        return NextResponse.json({ message: 'Video uploaded successfully', video: newVideo }, { status: 201 });
    } catch (error) {
        console.error('Error in API:', error); // Log the error for debugging
        return NextResponse.json({ error: 'Error fetching video details' }, { status: 500 });
    }
}