import { create } from "zustand";
import api from "../lib/axios";

export const useAdminStore = create((set, get) => ({
  users: [],
  loading: false,
  error: null,

  fetchUsers: async () => {
    set({ loading: true, error: null });
    try {
      const { data } = await api.get("/admin/users");
      set({ users: data, loading: false });
    } catch (error) {
      const message = error.response?.data?.message || "Failed to fetch users";
      set({ error: message, loading: false });
    }
  },

  updateUser: async (id, updates) => {
    try {
      const { data } = await api.put(`/admin/users/${id}`, updates);
      set({
        users: get().users.map((u) => (u._id === id ? data : u)),
        error: null,
      });
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.message || "Failed to update user";
      return { success: false, message };
    }
  },

  deleteUser: async (id) => {
    try {
      await api.delete(`/admin/users/${id}`);
      set({
        users: get().users.filter((u) => u._id !== id),
        error: null,
      });
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.message || "Failed to delete user";
      return { success: false, message };
    }
  },

  clearError: () => set({ error: null }),
}));
