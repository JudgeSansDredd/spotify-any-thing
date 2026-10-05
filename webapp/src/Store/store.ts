import { configureStore } from '@reduxjs/toolkit';
import artilleryReducer from './slices/artillerySlice';
import navReducer from './slices/navSlice';

export const store = configureStore({
  reducer: {
    nav: navReducer,
    artillery: artilleryReducer,
  },
});

// Infer the `RootState`,  `AppDispatch`, and `AppStore` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
