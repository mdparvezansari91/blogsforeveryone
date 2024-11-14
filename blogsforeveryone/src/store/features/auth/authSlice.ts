import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import { toast } from 'react-toastify';

interface User {
  email: string;
  password:string
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

interface ErrorResponse {
  message: string;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

export const signIn = createAsyncThunk(
  'auth/signIn',
  async (userData: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await axios.post('/api/signin', userData);
      toast.success(response.data.message);
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError<ErrorResponse>;
      toast.error(axiosError.response?.data?.message || 'Sign in failed');
      return rejectWithValue(axiosError.response?.data?.message || 'Sign in failed');
    }
  }
);

export const signUp = createAsyncThunk(
  'auth/signUp',
  async (userData: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await axios.post('/api/signup',
        userData
      );
      toast.success(response.data.message);
      return response.data.user;
    } catch (error) {
      const axiosError = error as AxiosError<ErrorResponse>;
      toast.error(axiosError.response?.data?.message || 'Sign up failed');
      return rejectWithValue(axiosError.response?.data?.message || 'Sign up failed');
    }
  }
);

export const signOut = createAsyncThunk(
  'auth/signOut',
  async (_, { rejectWithValue }) => {
    try {
      await axios.post('/api/signout');
      toast.success('Signed out successfully');
    } catch (error) {
      const axiosError = error as AxiosError<ErrorResponse>;
      toast.error(axiosError.response?.data?.message || 'Sign out failed');
      return rejectWithValue(axiosError.response?.data?.message || 'Sign out failed');
    }
  }
);

export const profile = createAsyncThunk("auth/profile",async(_, {rejectWithValue})=>{
  try {
    const response = await axios.post('/api/profile');
    return response.data
  } catch (error) {
    const axiosError = error as AxiosError<ErrorResponse>;
      // Only show toast for actual errors, not for unauthorized states
      if (axiosError.response?.status !== 401) {
        toast.error(axiosError.response?.data?.message || 'Profile fetch failed');
      }
      return rejectWithValue(axiosError.response?.data?.message || 'profile fetch failed');

  }
})

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signIn.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(signIn.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(signUp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(signUp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(signOut.pending, (state) => {
        state.loading = true; // Set loading to true when signing out
      })
      .addCase(signOut.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(signOut.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(profile.pending, (state) => {
        state.loading = true; // Set loading to true when fetching profile
        state.error = null; // Reset error state
      })
      .addCase(profile.fulfilled, (state, action) => {
        state.loading = false; // Set loading to false on success
        state.user = action.payload; // Update user with fetched profile
      })
      .addCase(profile.rejected, (state, action) => {
        state.loading = false; // Set loading to false on error
        state.error = action.payload as string; // Set error message
      });
  },
});

export default authSlice.reducer;