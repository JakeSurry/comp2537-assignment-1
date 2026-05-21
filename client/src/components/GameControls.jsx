import { motion } from "framer-motion";
import { Play, RotateCcw, Eye, Sun, Moon } from "lucide-react";

const difficulties = [
  { key: "easy", label: "Easy", desc: "4 pairs · 60s" },
  { key: "medium", label: "Medium", desc: "6 pairs · 90s" },
  { key: "hard", label: "Hard", desc: "9 pairs · 120s" },
];

const GameControls = ({
  difficulty,
  gameStatus,
  isLoading,
  powerUpUsed,
  powerUpActive,
  theme,
  onSetDifficulty,
  onStart,
  onReset,
  onPowerUp,
  onToggleTheme,
}) => {
  const isPlaying = gameStatus === "playing";
  const isIdle = gameStatus === "idle";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="flex flex-col items-center gap-4 mb-6"
    >
      {(isIdle || gameStatus === "won" || gameStatus === "lost") && (
        <div className="flex gap-2">
          {difficulties.map((d) => (
            <button
              key={d.key}
              onClick={() => onSetDifficulty(d.key)}
              className={`px-4 py-2 rounded-xl text-sm font-semibold border-2 transition-all duration-200 hover:cursor-pointer ${
                difficulty === d.key
                  ? "bg-primary border-primary text-surface"
                  : "bg-surface/60 border-muted/30 text-muted hover:border-primary/50 hover:text-text"
              }`}
            >
              <span>{d.label}</span>
              <span className="block text-[10px] font-normal opacity-70">
                {d.desc}
              </span>
            </button>
          ))}
        </div>
      )}

      <div className="flex flex-wrap items-center justify-center gap-3">
        <button
          onClick={onStart}
          disabled={isLoading}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm border-2 transition-all duration-200 hover:cursor-pointer
            ${
              isLoading
                ? "opacity-50 cursor-not-allowed border-muted/30 bg-surface/60 text-muted"
                : "bg-primary border-primary text-surface hover:shadow-lg hover:shadow-primary/20 hover:scale-[1.02] active:scale-[0.98]"
            }`}
        >
          <Play size={16} />
          {isLoading ? "Loading..." : isPlaying ? "New Game" : "Start Game"}
        </button>

        {(isPlaying || gameStatus === "won" || gameStatus === "lost") && (
          <button
            onClick={onReset}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-sm border-2 
              bg-surface/60 border-muted/30 text-muted hover:border-red-400/50 hover:text-red-400 
              transition-all duration-200 hover:cursor-pointer"
          >
            <RotateCcw size={16} />
            Reset
          </button>
        )}

        {isPlaying && (
          <button
            onClick={onPowerUp}
            disabled={powerUpUsed}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-sm border-2 transition-all duration-200 hover:cursor-pointer
              ${
                powerUpActive
                  ? "bg-yellow-400/20 border-yellow-400/60 text-yellow-400 animate-pulse"
                  : powerUpUsed
                    ? "opacity-40 cursor-not-allowed border-muted/20 bg-surface/40 text-muted"
                    : "bg-surface/60 border-yellow-400/30 text-yellow-400 hover:border-yellow-400/60 hover:bg-yellow-400/10"
              }`}
          >
            <Eye size={16} />
            {powerUpActive ? "Revealing..." : powerUpUsed ? "Used" : "Power-Up"}
          </button>
        )}

        <button
          onClick={onToggleTheme}
          className="p-2.5 rounded-xl border-2 bg-surface/60 border-muted/30 text-muted 
            hover:border-primary/50 hover:text-primary transition-all duration-200 hover:cursor-pointer"
          aria-label="Toggle theme"
        >
          {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
        </button>
      </div>
    </motion.div>
  );
};

export default GameControls;
