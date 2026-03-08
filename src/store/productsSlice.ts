import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Product, ProductFilters } from "@/types";
import { productApi } from "@/services/api";

interface ProductsState {
  items: Product[];
  selectedProduct: Product | null;
  filters: ProductFilters;
  loading: boolean;
  error: string | null;
}

const initialState: ProductsState = {
  items: [],
  selectedProduct: null,
  filters: {
    category: "",
    priceRange: [0, 1000],
    minRating: 0,
    search: "",
    sort: "popularity",
  },
  loading: false,
  error: null,
};

export const fetchProducts = createAsyncThunk("products/fetchAll", async () => {
  return await productApi.getAll();
});

export const fetchProductById = createAsyncThunk("products/fetchById", async (id: string) => {
  return await productApi.getById(id);
});

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearFilters: (state) => {
      state.filters = initialState.filters;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(fetchProducts.fulfilled, (state, action) => { state.loading = false; state.items = action.payload; })
      .addCase(fetchProducts.rejected, (state, action) => { state.loading = false; state.error = action.error.message || "Failed to fetch products"; })
      .addCase(fetchProductById.pending, (state) => { state.loading = true; })
      .addCase(fetchProductById.fulfilled, (state, action) => { state.loading = false; state.selectedProduct = action.payload || null; })
      .addCase(fetchProductById.rejected, (state, action) => { state.loading = false; state.error = action.error.message || "Failed to fetch product"; });
  },
});

export const { setFilters, clearFilters } = productsSlice.actions;
export default productsSlice.reducer;
