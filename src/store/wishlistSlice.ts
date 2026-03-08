import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface WishlistState {
  ids: string[];
}

const initialState: WishlistState = {
  ids: JSON.parse(localStorage.getItem("wishlist") || "[]"),
};

const persist = (ids: string[]) => localStorage.setItem("wishlist", JSON.stringify(ids));

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    toggleWishlist: (state, action: PayloadAction<string>) => {
      const idx = state.ids.indexOf(action.payload);
      if (idx >= 0) state.ids.splice(idx, 1);
      else state.ids.push(action.payload);
      persist(state.ids);
    },
  },
});

export const { toggleWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
