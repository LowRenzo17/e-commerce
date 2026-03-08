import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { User } from "@/types";
import { authApi } from "@/services/api";

interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: JSON.parse(localStorage.getItem("user") || "null"),
  token: localStorage.getItem("auth_token"),
  loading: false,
  error: null,
};

export const login = createAsyncThunk("auth/login", async ({ email, password }: { email: string; password: string }) => {
  const result = await authApi.login(email, password);
  localStorage.setItem("auth_token", result.token);
  localStorage.setItem("user", JSON.stringify(result.user));
  return result;
});

export const register = createAsyncThunk("auth/register", async ({ name, email, password }: { name: string; email: string; password: string }) => {
  const result = await authApi.register(name, email, password);
  localStorage.setItem("auth_token", result.token);
  localStorage.setItem("user", JSON.stringify(result.user));
  return result;
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("auth_token");
      localStorage.removeItem("user");
    },
    clearError: (state) => { state.error = null; },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(login.fulfilled, (state, action) => { state.loading = false; state.user = action.payload.user; state.token = action.payload.token; })
      .addCase(login.rejected, (state, action) => { state.loading = false; state.error = action.error.message || "Login failed"; })
      .addCase(register.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(register.fulfilled, (state, action) => { state.loading = false; state.user = action.payload.user; state.token = action.payload.token; })
      .addCase(register.rejected, (state, action) => { state.loading = false; state.error = action.error.message || "Registration failed"; });
  },
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;
