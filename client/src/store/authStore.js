import { create } from "zustand";
import api from "../lib/axios";

export const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  error: null,
  isLoading: false,
  isCheckingAuth: true,

  register: async (username, password) => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.post("/auth/register", {
        username,
        password,
      });
      if (response.data.success)
        set({
          isCheckingAuth: false,
          isLoading: false,
        });
    } catch (err) {
      set({
        error:
          err.response?.data?.message || "An error occured during registration",
        isLoading: false,
      });
      throw err;
    }
  },

  login: async (username, password, rememberMe) => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.post("/auth/login", {
        username,
        password,
        rememberMe,
      });
      set({
        user: response.data.user,
        isAuthenticated: true,
        isCheckingAuth: false,
        isLoading: false,
      });
    } catch (err) {
      set({
        error: err.response?.data?.message || "An error occured during log in",
        isLoading: false,
      });
      throw err;
    }
  },

  logout: async () => {
    set({ isLoading: true, error: null });
    try {
      await api.post("/auth/logout");
      set({
        user: null,
        isAuthenticated: false,
        isLoading: false,
      });
    } catch (err) {
      set({
        error: err.response?.data?.message || "An error occured during log out",
        isLoading: false,
      });
      throw err;
    }
  },

  checkAuth: async () => {
    set({ isCheckingAuth: true, error: null });
    try {
      const response = await api.get("/auth/me");
      set({
        user: response.data.user,
        isAuthenticated: true,
        isCheckingAuth: false,
      });
    } catch {
      set({ isCheckingAuth: false, isAuthenticated: false });
    }
  },

  clearError: async () => set({ error: null }),
}));
