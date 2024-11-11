import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';

interface Blogs {
    _id: string;
    title: string;
    content:string
}

interface BlogsState {
    blog: Blogs | null;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: BlogsState = {
    blog:null,
    status: 'idle',
    error: null,
};

export const fetchclickedblog = createAsyncThunk(
    'blogs/fetchclickedblog',
    async (id:string , { rejectWithValue }) => {
        try {
            const response = await axios.get(`/api/blogs/${id}`);
            return response.data.blog; // Correctly accessing the products array
        } catch (error) {
            if (axios.isAxiosError(error)) {
                toast.error(error.response?.data?.message || 'Failed to fetch products');
                return rejectWithValue(error.response?.data?.message || 'Failed to fetch products');
            }
            return rejectWithValue('An unexpected error occurred');
        }
    }
);




const detailedblogsSlice = createSlice({
    name: 'detailedblogs',
    initialState,
    reducers: {
        
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchclickedblog.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchclickedblog.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.blog = action.payload; // This should now be an array
                state.error = null;
            })
            .addCase(fetchclickedblog.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload as string;
            });
    },
});

export default detailedblogsSlice.reducer;