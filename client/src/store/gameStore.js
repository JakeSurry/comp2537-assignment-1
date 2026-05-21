import { create } from "zustand";
import api from "../lib/axios";

const DIFFICULTY_CONFIG = {
  easy: { pairs: 4, timer: 60 },
  medium: { pairs: 6, timer: 90 },
  hard: { pairs: 9, timer: 120 },
};

const POWERUP_DURATION = 3000;
const MATCH_DISPLAY_DELAY = 600;
const MISMATCH_DISPLAY_DELAY = 900;

const shuffleArray = (arr) => {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export const useMemoryGameStore = create((set, get) => ({
  cards: [],
  flippedIndices: [],
  matchedIds: [],
  clicks: 0,
  pairsMatched: 0,
  totalPairs: 0,
  difficulty: "easy",
  gameStatus: "idle",
  timer: 0,
  maxTimer: 60,
  timerInterval: null,
  isLoading: false,
  error: null,

  powerUpActive: false,
  powerUpUsed: false,

  setDifficulty: (difficulty) => {
    const config = DIFFICULTY_CONFIG[difficulty];
    set({ difficulty, maxTimer: config.timer, totalPairs: config.pairs });
  },

  fetchAndStartGame: async () => {
    const { difficulty, timerInterval } = get();
    const config = DIFFICULTY_CONFIG[difficulty];

    if (timerInterval) clearInterval(timerInterval);

    set({ isLoading: true, error: null, gameStatus: "idle" });

    try {
      const randomPage = Math.floor(Math.random() * 10) + 1;
      const response = await api.get("/pokemon", {
        params: { page: randomPage, limit: config.pairs * 2 },
      });

      const available = response.data.pokemons;
      const shuffled = shuffleArray(available);
      const selected = shuffled.slice(0, config.pairs);

      const pokemon = selected.map((p) => ({
        pokemonId: p.id,
        name: p.name,
        image: p.image,
      }));

      const cardPairs = pokemon.flatMap((p, i) => [
        { ...p, uid: `${p.pokemonId}-a`, pairIndex: i },
        { ...p, uid: `${p.pokemonId}-b`, pairIndex: i },
      ]);

      const shuffledCards = shuffleArray(cardPairs);

      set({
        cards: shuffledCards,
        flippedIndices: [],
        matchedIds: [],
        clicks: 0,
        pairsMatched: 0,
        totalPairs: config.pairs,
        maxTimer: config.timer,
        timer: config.timer,
        gameStatus: "playing",
        isLoading: false,
        powerUpActive: false,
        powerUpUsed: false,
      });

      const interval = setInterval(() => {
        const state = get();
        if (state.timer <= 1) {
          clearInterval(interval);
          set({ timer: 0, gameStatus: "lost", timerInterval: null });
          return;
        }
        set({ timer: state.timer - 1 });
      }, 1000);

      set({ timerInterval: interval });
    } catch (err) {
      set({
        error:
          err.response?.data?.message ||
          "Failed to fetch Pokémon. Please try again.",
        isLoading: false,
        gameStatus: "idle",
      });
    }
  },

  flipCard: (index) => {
    const { cards, flippedIndices, matchedIds, gameStatus, powerUpActive } =
      get();

    if (
      gameStatus !== "playing" ||
      powerUpActive ||
      flippedIndices.length >= 2 ||
      flippedIndices.includes(index) ||
      matchedIds.includes(cards[index].pokemonId)
    ) {
      return;
    }

    const newFlipped = [...flippedIndices, index];
    set({ flippedIndices: newFlipped, clicks: get().clicks + 1 });

    if (newFlipped.length === 2) {
      const [first, second] = newFlipped;
      const card1 = cards[first];
      const card2 = cards[second];

      if (card1.pokemonId === card2.pokemonId) {
        setTimeout(() => {
          const state = get();
          const newMatched = [...state.matchedIds, card1.pokemonId];
          const newPairsMatched = state.pairsMatched + 1;
          const won = newPairsMatched === state.totalPairs;

          if (won && state.timerInterval) {
            clearInterval(state.timerInterval);
          }

          set({
            matchedIds: newMatched,
            pairsMatched: newPairsMatched,
            flippedIndices: [],
            gameStatus: won ? "won" : state.gameStatus,
            timerInterval: won ? null : state.timerInterval,
          });
        }, MATCH_DISPLAY_DELAY);
      } else {
        setTimeout(() => {
          set({ flippedIndices: [] });
        }, MISMATCH_DISPLAY_DELAY);
      }
    }
  },

  activatePowerUp: () => {
    const { gameStatus, powerUpUsed } = get();
    if (gameStatus !== "playing" || powerUpUsed) return;

    set({ powerUpActive: true, powerUpUsed: true });

    setTimeout(() => {
      set({ powerUpActive: false });
    }, POWERUP_DURATION);
  },

  resetGame: () => {
    const { timerInterval } = get();
    if (timerInterval) clearInterval(timerInterval);
    set({
      cards: [],
      flippedIndices: [],
      matchedIds: [],
      clicks: 0,
      pairsMatched: 0,
      totalPairs: 0,
      gameStatus: "idle",
      timer: 0,
      timerInterval: null,
      isLoading: false,
      error: null,
      powerUpActive: false,
      powerUpUsed: false,
    });
  },

  clearError: () => set({ error: null }),
}));
