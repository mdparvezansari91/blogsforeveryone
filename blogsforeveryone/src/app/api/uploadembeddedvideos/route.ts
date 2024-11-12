// pages/api/videos.ts

import dbConnect from '@/lib/mongoose';
import EmbeddedVideos from '@/models/EmbeddedVideos';
import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server'; // Import NextResponse

export async function POST(req: NextRequest) { // Use the Request type
    await dbConnect();

    try {
        
        const { url, title } = await req.json(); // Parse the JSON body
        console.log({"url":url})
        const videoId = url.split('v=')[1]?.split('&')[0]; // Extract video ID
        console.log({"vidoeId":videoId})

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
        console.log({"youtuberesponse":response})
        const videoDetails = response.data.items[0].snippet;

        const newVideo = new EmbeddedVideos({
            videoId,
            title: title || videoDetails.title,
            description: videoDetails.description,
            thumbnail: videoDetails.thumbnails.default.url,
            likes: 0, // Initialize likes
            comments: [], // Initialize comments
        });

        await newVideo.save();
        return NextResponse.json({ message: 'Video uploaded successfully', video: newVideo }, { status: 201 });
    } catch (error) {
        console.error(error); // Log the error for debugging
        return NextResponse.json({ error: 'Error fetching video details' }, { status: 500 });
    }
}