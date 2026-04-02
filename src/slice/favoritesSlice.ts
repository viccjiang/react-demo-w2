import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Product } from "../dto/product";

interface FavoritesState {
  viewedIds: string[];
  favorites: Product[];
}

const STORAGE_KEY_VIEWED = "repx_viewed_ids";
const STORAGE_KEY_FAVORITES = "repx_favorites";

function loadFromStorage<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

const initialState: FavoritesState = {
  viewedIds: loadFromStorage<string[]>(STORAGE_KEY_VIEWED, []),
  favorites: loadFromStorage<Product[]>(STORAGE_KEY_FAVORITES, []),
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    addViewed(state, action: PayloadAction<string>) {
      const id = action.payload;
      // 移到最前面（最近瀏覽）
      state.viewedIds = [id, ...state.viewedIds.filter((v) => v !== id)];
      localStorage.setItem(STORAGE_KEY_VIEWED, JSON.stringify(state.viewedIds));
    },
    addFavorite(state, action: PayloadAction<Product>) {
      const product = action.payload;
      if (!state.favorites.some((f) => f.id === product.id)) {
        state.favorites.push(product);
        localStorage.setItem(
          STORAGE_KEY_FAVORITES,
          JSON.stringify(state.favorites)
        );
      }
    },
    removeFavorite(state, action: PayloadAction<string | number>) {
      state.favorites = state.favorites.filter((f) => f.id !== action.payload);
      localStorage.setItem(
        STORAGE_KEY_FAVORITES,
        JSON.stringify(state.favorites)
      );
    },
  },
});

export const { addViewed, addFavorite, removeFavorite } =
  favoritesSlice.actions;
export default favoritesSlice.reducer;
