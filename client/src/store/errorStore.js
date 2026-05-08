import { create } from "zustand";

const useErrorStore = create((set) => ({
  networkError: null,
  setNetworkError: (msg) => set({ networkError: msg }),
  clearNetworkError: () => set({ networkError: null }),
}));

export default useErrorStore;
