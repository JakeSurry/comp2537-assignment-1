import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { useFavoriteStore } from "../store/favoriteStore";
import { useAuthStore } from "../store/authStore";

const PokemonCard = ({ delay, pokemon }) => {
  const { isAuthenticated } = useAuthStore();
  const { addFavorite, removeFavorite, isFavorite } = useFavoriteStore();

  const favorited = isFavorite(pokemon.id);

  const handleFavoriteToggle = (e) => {
    e.stopPropagation();
    if (favorited) {
      removeFavorite(pokemon.id);
    } else {
      addFavorite(pokemon);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0, transition: {delay: delay} }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -4 }}
      className="relative bg-surface/80  backdrop-blur-2xl rounded-2xl shadow-xl overflow-hidden group"
    >
      {isAuthenticated && (
        <button
          onClick={handleFavoriteToggle}
          className="absolute top-3 right-3 z-10 p-2 rounded-full bg-surface/50 hover:bg-surface transition duration-200 hover:cursor-pointer"
        >
          <Heart
            size={20}
            className={
              favorited
                ? "fill-primary text-primary"
                : "text-text group-hover:text-primary"
            }
          />
        </button>
      )}

      <div className="flex items-center justify-center p-6 pb-2">
        <img
          src={pokemon.image}
          alt={pokemon.name}
          className="w-28 h-28 object-contain drop-shadow-lg group-hover:scale-110 transition-transform duration-300"
        />
      </div>

      <div className="p-4 pt-2 text-center">
        <p className="text-xs text-muted font-mono">
          #{String(pokemon.id).padStart(3, "0")}
        </p>
        <h2 className="text-lg font-bold text-text capitalize mt-1">
          {pokemon.name}
        </h2>
      </div>
    </motion.div>
  );
};

export default PokemonCard;
