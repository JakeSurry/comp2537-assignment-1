import { create } from "zustand";
import api from "../lib/axios";

export const useActivityStore = create((set) => ({
  events: [],
  error: null,
  isLoading: false,

  fetchEvents: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.get(`${URL}/activity`);
      set({
        events: response.data.events,
        isLoading: false,
      });
    } catch (err) {
      set({
        error:
          err.response?.data?.message || "An error occurred fetching events",
        isLoading: false,
      });
    }
  },

  deleteEvent: async (eventId) => {
    set({ error: null });
    try {
      await api.delete(`${URL}/activity/${eventId}`);
      set((state) => ({
        events: state.events.filter((event) => event._id !== eventId),
      }));
    } catch (err) {
      set({
        error:
          err.response?.data?.message || "An error occurred deleting event",
      });
    }
  },

  clearError: async () => set({ error: null }),
}));
