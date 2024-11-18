import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';

interface Source {
    name: string;
}

interface Article {
    _id: string;
    title: string;
    description: string;
    url: string;
    source: Source;
    published_at: string;
    author: string;
    image: string;
    category: string;
    language: string;
    country: string;
}

interface ArticleState {
    articles: Article[]; // Changed from 'article' to 'articles' for clarity
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
    currentPage: number;
    totalPages: number;
}

const initialState: ArticleState = {
    articles: [],
    status: 'idle',
    error: null,
    currentPage: 1,
    totalPages: 1,
};

// Thunk to fetch articles
export const fetchArticles = createAsyncThunk(
    'articles/fetchArticles',
    async ({ page, limit }: { page: number; limit: number }, { rejectWithValue }) => {
        try {
            const response = await axios.get(`/api/articles?page=${page}&limit=${limit}`);
            return response.data; // Ensure this returns { articles: Article[], totalPages: number }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                toast.error(error.response?.data?.message || 'Failed to fetch articles');
                return rejectWithValue(error.response?.data?.message || 'Failed to fetch articles');
            }
            return rejectWithValue('An unexpected error occurred');
        }
    }
);

// Article slice
const articleSlice = createSlice({
    name: 'articles',
    initialState,
    reducers: {
        setCurrentPage(state, action) {
            state.currentPage = action.payload; // Update current page
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchArticles.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchArticles.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.articles = action.payload.articles; // Assuming the API response has articles
                state.totalPages = action.payload.totalPages; // Assuming the API response has totalPages
                state.error = null;
            })
            .addCase(fetchArticles.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload as string;
            });
    },
});

export const { setCurrentPage } = articleSlice.actions;
export default articleSlice.reducer;