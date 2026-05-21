import { motion } from "framer-motion";
import { MousePointerClick, Layers, Timer, Trophy } from "lucide-react";

const StatBadge = ({ icon: Icon, label, value, color = "text-primary" }) => (
  <div className="flex items-center gap-2 bg-surface/60 backdrop-blur-sm rounded-xl px-3 py-2 border border-muted/20">
    <Icon size={16} className={color} />
    <div className="flex flex-col">
      <span className="text-[10px] text-muted uppercase tracking-wider leading-none">
        {label}
      </span>
      <span className="text-sm font-bold text-text leading-tight">{value}</span>
    </div>
  </div>
);

const GameHeader = ({
  clicks,
  pairsMatched,
  totalPairs,
  timer,
  gameStatus,
}) => {
  const pairsLeft = totalPairs - pairsMatched;
  const minutes = Math.floor(timer / 60);
  const seconds = timer % 60;
  const timeString = `${minutes}:${String(seconds).padStart(2, "0")}`;
  const isLowTime = timer <= 15 && gameStatus === "playing";

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-5"
    >
      <StatBadge icon={MousePointerClick} label="Clicks" value={clicks} />
      <StatBadge
        icon={Trophy}
        label="Matched"
        value={`${pairsMatched} / ${totalPairs}`}
        color="text-green-400"
      />
      <StatBadge
        icon={Layers}
        label="Left"
        value={pairsLeft}
        color="text-yellow-400"
      />
      <div
        className={`flex items-center gap-2 rounded-xl px-3 py-2 border transition-colors duration-300 ${
          isLowTime
            ? "bg-red-500/10 border-red-500/40 animate-pulse"
            : "bg-surface/60 backdrop-blur-sm border-muted/20"
        }`}
      >
        <Timer
          size={16}
          className={isLowTime ? "text-red-400" : "text-blue-400"}
        />
        <div className="flex flex-col">
          <span className="text-[10px] text-muted uppercase tracking-wider leading-none">
            Time
          </span>
          <span
            className={`text-sm font-bold leading-tight font-mono ${
              isLowTime ? "text-red-400" : "text-text"
            }`}
          >
            {timeString}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default GameHeader;
