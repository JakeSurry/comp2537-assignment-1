import { useEffect } from "react";
import { motion } from "framer-motion";
import { useMemoryGameStore } from "../store/gameStore.js";
import useTheme from "../hooks/useTheme.js";
import MemoryCard from "../components/MemoryCard.jsx";
import GameHeader from "../components/GameHeader.jsx";
import GameControls from "../components/GameControls.jsx";
import GameOverModal from "../components/GameOverModal.jsx";
import { AlertTriangle } from "lucide-react";

const MemoryGamePage = () => {
  const {
    cards,
    flippedIndices,
    matchedIds,
    clicks,
    pairsMatched,
    totalPairs,
    difficulty,
    gameStatus,
    timer,
    isLoading,
    error,
    powerUpActive,
    powerUpUsed,
    setDifficulty,
    fetchAndStartGame,
    flipCard,
    activatePowerUp,
    resetGame,
    clearError,
  } = useMemoryGameStore();

  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    return () => {
      const { timerInterval } = useMemoryGameStore.getState();
      if (timerInterval) clearInterval(timerInterval);
    };
  }, []);

  const getGridCols = () => {
    const count = cards.length;
    if (count <= 8) return "grid-cols-4";
    if (count <= 12) return "grid-cols-4 sm:grid-cols-4";
    return "grid-cols-4 sm:grid-cols-6";
  };

  const isPlaying = gameStatus === "playing";

  return (
    <div className="px-4 pb-8 max-w-3xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-6"
      >
        <h1 className="text-2xl sm:text-3xl font-bold text-text">
          Memory <span className="text-primary">Match</span>
        </h1>
        <p className="text-sm text-muted mt-1">
          Find all the matching Pokémon pairs!
        </p>
      </motion.div>

      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-3 mb-4 p-4 rounded-xl bg-red-500/10 border border-red-500/30"
        >
          <AlertTriangle size={18} className="text-red-400 shrink-0" />
          <p className="text-sm text-red-400 flex-1">{error}</p>
          <button
            onClick={clearError}
            className="text-red-400 hover:text-red-300 text-xs font-semibold hover:cursor-pointer"
          >
            Dismiss
          </button>
        </motion.div>
      )}

      <GameControls
        difficulty={difficulty}
        gameStatus={gameStatus}
        isLoading={isLoading}
        powerUpUsed={powerUpUsed}
        powerUpActive={powerUpActive}
        theme={theme}
        onSetDifficulty={setDifficulty}
        onStart={fetchAndStartGame}
        onReset={resetGame}
        onPowerUp={activatePowerUp}
        onToggleTheme={toggleTheme}
      />

      {isPlaying && (
        <GameHeader
          clicks={clicks}
          pairsMatched={pairsMatched}
          totalPairs={totalPairs}
          timer={timer}
          gameStatus={gameStatus}
        />
      )}

      {isLoading && (
        <div className="flex flex-col items-center justify-center py-16 gap-3">
          <div className="w-10 h-10 border-3 border-primary/30 border-t-primary rounded-full animate-spin" />
          <p className="text-muted text-sm">Catching Pokemon...</p>
        </div>
      )}

      {!isLoading && cards.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className={`grid ${getGridCols()} gap-2 sm:gap-3`}
        >
          {cards.map((card, index) => {
            const isFlipped = flippedIndices.includes(index) || powerUpActive;
            const isMatched = matchedIds.includes(card.pokemonId);

            return (
              <MemoryCard
                key={card.uid}
                card={card}
                index={index}
                isFlipped={isFlipped}
                isMatched={isMatched}
                onClick={flipCard}
                disabled={
                  !isPlaying || powerUpActive || flippedIndices.length >= 2
                }
              />
            );
          })}
        </motion.div>
      )}

      {!isLoading && cards.length === 0 && gameStatus === "idle" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-16"
        >
          <p className="text-muted text-lg">
            Choose a difficulty and press Start!
          </p>
          <p className="text-muted/60 text-sm mt-2">
            Match pairs of Pokémon before time runs out
          </p>
        </motion.div>
      )}

      <GameOverModal
        gameStatus={gameStatus}
        clicks={clicks}
        pairsMatched={pairsMatched}
        totalPairs={totalPairs}
        timer={timer}
        onRestart={fetchAndStartGame}
        onReset={resetGame}
      />
    </div>
  );
};

export default MemoryGamePage;
