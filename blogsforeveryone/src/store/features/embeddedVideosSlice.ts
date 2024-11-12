import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';

interface EmbeddedVideo {
    _id: string;
    title: string;
    videoId: string; // Assuming you want to use videoId instead of url
}

interface EmbeddedVideosState {
    videos: EmbeddedVideo[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: EmbeddedVideosState = {
    videos: [],
    status: 'idle',
    error: null,
};

export const fetchembeddedvideos = createAsyncThunk(
    'embeddedVideos/fetchVideos',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get('/api/embeddedvideos'); // Ensure this matches your API route
            return response.data.embeddedvideos; // Correctly accessing the videos array
        } catch (error) {
            if (axios.isAxiosError(error)) {
                toast.error(error.response?.data?.message || 'Failed to fetch videos');
                return rejectWithValue(error.response?.data?.message || 'Failed to fetch videos');
            }
            return rejectWithValue('An unexpected error occurred');
        }
    }
);

const embeddedVideosSlice = createSlice({
    name: 'embeddedVideos',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchembeddedvideos.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchembeddedvideos.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.videos = action.payload; // This should now be an array of videos
                console.log(action.payload)
                state.error = null;
            })
            .addCase(fetchembeddedvideos.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload as string;
            });
    },
});

export default embeddedVideosSlice.reducer;