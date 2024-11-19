import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';

interface Source {
    name: string;
}

interface FilterOption {
    id: string; // or number, based on your identifier type
    value: string;
    label: string;
}

interface CountryOption {
    id: string; // or number, based on your identifier type
    value:string;
    label:string
}

interface Filter {
    category: string;
    country: string;
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
    filter:Filter;
    filterOptions:FilterOption[]
    countryOptions:CountryOption[]
    
}

const initialState: ArticleState = {
    articles: [],
    status: 'idle',
    error: null,
    currentPage: 1,
    totalPages: 1,
    filter: {
        category: '',
        country: '',
    },
    filterOptions:[],
    countryOptions:[],
};

// Thunk to fetch articles
export const fetchArticles = createAsyncThunk(
    'articles/fetchArticles',
    async ({ page, limit, filter }: { page: number; limit: number; filter: Filter }, { rejectWithValue }) => {
        try {
            const response = await axios.get(`/api/articles?page=${page}&limit=${limit}&category=${filter.category}&country=${filter.country}`);
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
        },setCategoryFilter(state, action) {
            state.filter.category = action.payload; // Update category filter
        },
        setCountryFilter(state, action) {
            state.filter.country = action.payload; // Update country filter
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
                state.filterOptions=action.payload.filterOptions
                state.countryOptions=action.payload.countryOptions
                state.error = null;
            })
            .addCase(fetchArticles.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload as string;
            });
    },
});

export const { setCurrentPage, setCategoryFilter, setCountryFilter } = articleSlice.actions;
export default articleSlice.reducer;