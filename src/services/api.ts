import axios from "axios";
import { Product, User, Order, ShippingAddress, CartItem } from "@/types";
import { mockProducts, mockReviews } from "@/data/mockProducts";

const api = axios.create({
  baseURL: "/api",
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
});

// Intercept requests to add auth token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("auth_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Simulated delay
const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

// --- Mock API functions (replace with real API calls) ---

export const productApi = {
  getAll: async (): Promise<Product[]> => {
    await delay(600);
    return mockProducts;
  },
  getById: async (id: string): Promise<Product | undefined> => {
    await delay(400);
    return mockProducts.find((p) => p.id === id);
  },
  getReviews: async (_productId: string) => {
    await delay(300);
    return mockReviews;
  },
};

export const authApi = {
  login: async (email: string, _password: string): Promise<{ user: User; token: string }> => {
    await delay(800);
    return {
      user: { id: "u1", name: "John Doe", email },
      token: "mock_jwt_token_" + Date.now(),
    };
  },
  register: async (name: string, email: string, _password: string): Promise<{ user: User; token: string }> => {
    await delay(800);
    return {
      user: { id: "u" + Date.now(), name, email },
      token: "mock_jwt_token_" + Date.now(),
    };
  },
};

export const orderApi = {
  create: async (items: CartItem[], address: ShippingAddress): Promise<Order> => {
    await delay(1000);
    const total = items.reduce((sum, i) => sum + i.product.price * i.quantity, 0);
    return {
      id: "ORD-" + Date.now(),
      items,
      shippingAddress: address,
      total,
      status: "pending",
      createdAt: new Date().toISOString(),
    };
  },
};

export default api;
