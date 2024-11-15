import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';

interface Blogs {
    _id: string;
    title: string;
    content:string,
    likes:string[],
    createdAt:string
}

interface BlogsState {
    blogs: Blogs[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: BlogsState = {
    blogs: [],
    status: 'idle',
    error: null,
};

export const hitlike = createAsyncThunk<{ blogId: string }, string>(
    "like/blog",
    async (blogid, { rejectWithValue }) => {
        try {
            const response = await axios.post("/api/blogs/hitlike", {
                blogid,
            });
            return response.data; // Ensure this returns the necessary data
        } catch (error) {
            if (axios.isAxiosError(error)) {
                return rejectWithValue(error.response?.data.message);
            }
            return rejectWithValue("An unexpected error occurred");
        }
    }
);


export const fetchblogs = createAsyncThunk(
    'products/fetchblogs',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get('/api/blogs');
            return response.data; // Correctly accessing the products array
        } catch (error) {
            if (axios.isAxiosError(error)) {
                toast.error(error.response?.data?.message || 'Failed to fetch products');
                return rejectWithValue(error.response?.data?.message || 'Failed to fetch products');
            }
            return rejectWithValue('An unexpected error occurred');
        }
    }
);




const blogsSlice = createSlice({
    name: 'blogs',
    initialState,
    reducers: {
        
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchblogs.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchblogs.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.blogs = action.payload.blogs; // This should now be an array
                state.error = null;
            })
            .addCase(fetchblogs.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload as string;
            });
    },
});

export default blogsSlice.reducer;