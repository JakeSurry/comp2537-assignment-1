import { motion, AnimatePresence } from "framer-motion";
import { Trophy, Clock, RotateCcw, Play } from "lucide-react";

const GameOverModal = ({
  gameStatus,
  clicks,
  pairsMatched,
  totalPairs,
  onRestart,
  onReset,
}) => {
  const isVisible = gameStatus === "won" || gameStatus === "lost";
  const won = gameStatus === "won";

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="bg-surface border-2 border-muted/30 rounded-2xl p-8 max-w-sm w-full text-center shadow-2xl"
          >
            <div
              className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${
                won ? "bg-green-400/20" : "bg-red-400/20"
              }`}
            >
              {won ? (
                <Trophy size={32} className="text-green-400" />
              ) : (
                <Clock size={32} className="text-red-400" />
              )}
            </div>

            <h2 className="text-2xl font-bold text-text mb-2">
              {won ? "You Won!" : "Time's Up!"}
            </h2>

            <p className="text-muted mb-6">
              {won
                ? `You matched all ${totalPairs} pairs in ${clicks} clicks!`
                : `You matched ${pairsMatched} of ${totalPairs} pairs.`}
            </p>

            <div className="flex gap-3 justify-center">
              <button
                onClick={onRestart}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm 
                  bg-primary border-2 border-primary text-surface 
                  hover:shadow-lg hover:shadow-primary/20 transition-all duration-200 hover:cursor-pointer"
              >
                <Play size={16} />
                Play Again
              </button>
              <button
                onClick={onReset}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-sm 
                  border-2 bg-surface/60 border-muted/30 text-muted 
                  hover:border-primary/50 hover:text-text transition-all duration-200 hover:cursor-pointer"
              >
                <RotateCcw size={16} />
                Menu
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default GameOverModal;
