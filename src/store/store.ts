import { configureStore } from "@reduxjs/toolkit";
import messageReducer from "../slice/messageSlice";
import favoritesReducer from "../slice/favoritesSlice";

export const store = configureStore({
  reducer: {
    message: messageReducer,
    favorites: favoritesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
