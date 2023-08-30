// // Infer the `RootState` and `AppDispatch` types from the store itself
// export type RootState = ReturnType<typeof appStore.getState>;
// // Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
// export type AppDispatch = typeof appStore.dispatch;

import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./rootReducer.tsx";

export const store = configureStore({
  reducer: rootReducer,
  devTools: true,
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
