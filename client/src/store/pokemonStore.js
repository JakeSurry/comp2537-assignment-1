import { create } from "zustand";
import api from "../lib/axios";

export const usePokemonStore = create((set) => ({
  pokemons: [],
  pokemon: null,
  types: [],
  total: 0,
  page: 1,
  totalPages: 1,
  error: null,
  isLoading: false,

  fetchPokemons: async (params = {}) => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.get("/pokemon", { params });
      set({
        pokemons: response.data.pokemons,
        total: response.data.total,
        page: response.data.page,
        totalPages: response.data.totalPages,
        isLoading: false,
      });
    } catch (err) {
      set({
        error:
          err.response?.data?.message || "An error occurred fetching Pokémon",
        isLoading: false,
      });
    }
  },

  fetchPokemon: async (id) => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.get(`/pokemon/${id}`);
      set({
        pokemon: response.data.pokemon,
        isLoading: false,
      });
    } catch (err) {
      set({
        error:
          err.response?.data?.message || "An error occurred fetching Pokémon",
        isLoading: false,
      });
    }
  },

  fetchTypes: async () => {
    try {
      const response = await api.get("/pokemon/types");
      set({ types: response.data.types });
    } catch (err) {
      set({
        error:
          err.response?.data?.message || "An error occurred fetching types",
      });
    }
  },

  clearPokemon: () => set({ pokemon: null }),
  clearError: () => set({ error: null }),
}));
