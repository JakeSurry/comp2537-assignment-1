import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { useFavoriteStore } from "../store/favoriteStore";
import { useAuthStore } from "../store/authStore";

const PokemonCard = ({ pokemon }) => {
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
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
      className="relative bg-gray-800 bg-opacity-50 backdrop-blur-2xl rounded-2xl shadow-xl overflow-hidden group"
    >
      {isAuthenticated && (
        <button
          onClick={handleFavoriteToggle}
          className="absolute top-3 right-3 z-10 p-2 rounded-full bg-gray-900/50 hover:bg-gray-900 transition duration-200 hover:cursor-pointer"
        >
          <Heart
            size={20}
            className={
              favorited
                ? "fill-red-300 text-red-300"
                : "text-gray-400 group-hover:text-red-300"
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
        <p className="text-xs text-gray-500 font-mono">
          #{String(pokemon.id).padStart(3, "0")}
        </p>
        <h2 className="text-lg font-bold text-gray-300 capitalize mt-1">
          {pokemon.name}
        </h2>
      </div>
    </motion.div>
  );
};

export default PokemonCard;
