import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/auth/authSlice';
import blogsReducer from './features/blogsSlice'
import detailedblogsReducer from "./features/detailsBlogSlice"


export const store = configureStore({
  reducer: {
    auth: authReducer,
    blogs:blogsReducer,
    detailedblogs:detailedblogsReducer
    // Add other reducers here as needed
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;