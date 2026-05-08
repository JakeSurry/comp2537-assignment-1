import { create } from "zustand";
import api from "../lib/axios";

export const useFavoriteStore = create((set) => ({
  favorites: [],
  error: null,
  isLoading: false,

  fetchFavorites: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.get(`${URL}/favorites`);
      set({
        favorites: response.data.favorites,
        isLoading: false,
      });
    } catch (err) {
      set({
        error:
          err.response?.data?.message || "An error occurred fetching favorites",
        isLoading: false,
      });
    }
  },

  addFavorite: async (pokemon) => {
    set({ error: null });
    try {
      const response = await api.post(`${URL}/favorites`, {
        pokemonId: pokemon.id,
        name: pokemon.name,
        image: pokemon.image,
      });
      set((state) => ({
        favorites: [response.data.favorite, ...state.favorites],
      }));
    } catch (err) {
      set({
        error:
          err.response?.data?.message || "An error occurred adding favorite",
      });
    }
  },

  removeFavorite: async (pokemonId) => {
    set({ error: null });
    try {
      await api.delete(`${URL}/favorites/${pokemonId}`);
      set((state) => ({
        favorites: state.favorites.filter((f) => f.pokemonId !== pokemonId),
      }));
    } catch (err) {
      set({
        error:
          err.response?.data?.message || "An error occurred removing favorite",
      });
    }
  },

  isFavorite: (pokemonId) => {
    return useFavoriteStore
      .getState()
      .favorites.some((f) => f.pokemonId === pokemonId);
  },

  clearError: () => set({ error: null }),
}));
