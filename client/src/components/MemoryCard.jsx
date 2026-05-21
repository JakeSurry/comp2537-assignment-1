import { motion } from "framer-motion";

const MemoryCard = ({
  card,
  index,
  isFlipped,
  isMatched,
  onClick,
  disabled,
}) => {
  const showFace = isFlipped || isMatched;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, rotateY: 180 }}
      animate={{ opacity: 1, scale: 1, rotateY: 0 }}
      transition={{ duration: 0.4, delay: index * 0.03 }}
      className="aspect-square perspective-midrange"
    >
      <button
        onClick={() => onClick(index)}
        disabled={disabled || isMatched}
        className={`relative w-full h-full cursor-pointer transition-transform duration-500 transform-3d ${
          showFace ? "transform-[rotateY(180deg)]" : ""
        } ${disabled && !showFace ? "cursor-not-allowed" : ""}`}
        aria-label={showFace ? `Card: ${card.name}` : "Hidden card"}
      >
        <div
          className={`absolute inset-0 rounded-2xl backface-hidden flex items-center justify-center
            bg-linear-to-br from-primary/80 to-primary/40 border-2 border-primary/30
            shadow-lg hover:shadow-primary/20 hover:border-primary/50 transition-all duration-200
            ${disabled && !showFace ? "opacity-60" : ""}`}
        >
          <div className="text-4xl sm:text-5xl select-none opacity-80">
            <svg
              viewBox="0 0 100 100"
              className="w-12 h-12 sm:w-16 sm:h-16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="50"
                cy="50"
                r="46"
                stroke="currentColor"
                strokeWidth="4"
                className="text-surface/40"
              />
              <line
                x1="4"
                y1="50"
                x2="96"
                y2="50"
                stroke="currentColor"
                strokeWidth="4"
                className="text-surface/40"
              />
              <circle
                cx="50"
                cy="50"
                r="14"
                stroke="currentColor"
                strokeWidth="4"
                className="text-surface/40"
              />
              <circle
                cx="50"
                cy="50"
                r="7"
                fill="currentColor"
                className="text-surface/30"
              />
            </svg>
          </div>
        </div>

        <div
          className={`absolute inset-0 rounded-2xl backface-hidden transform-[rotateY(180deg)]
            flex flex-col items-center justify-center gap-1 p-2
            bg-surface/90 backdrop-blur-sm border-2 shadow-lg
            ${
              isMatched
                ? "border-green-400/60 shadow-green-400/10 bg-green-400/5"
                : "border-muted/40"
            }`}
        >
          <img
            src={card.image}
            alt={card.name}
            className={`w-14 h-14 sm:w-20 sm:h-20 object-contain drop-shadow-md transition-transform duration-300 ${
              isMatched ? "scale-110" : ""
            }`}
            loading="lazy"
          />
          <p className="text-[10px] sm:text-xs font-bold text-text capitalize truncate w-full text-center mt-1">
            {card.name}
          </p>
          {isMatched && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute top-2 right-2 w-5 h-5 rounded-full bg-green-400 flex items-center justify-center"
            >
              <svg
                className="w-3 h-3 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={3}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </motion.div>
          )}
        </div>
      </button>
    </motion.div>
  );
};

export default MemoryCard;
