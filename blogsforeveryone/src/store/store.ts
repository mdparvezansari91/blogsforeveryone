import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/auth/authSlice';
import blogsReducer from './features/blogsSlice'
import detailedblogsReducer from "./features/detailsBlogSlice"
import EmbeddedVideoReducer from "./features/embeddedVideosSlice"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    blogs:blogsReducer,
    detailedblogs:detailedblogsReducer,
    embeddedVideos:EmbeddedVideoReducer
    // Add other reducers here as needed
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;