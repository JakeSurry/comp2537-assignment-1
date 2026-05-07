import { useEffect, useState } from "react";
import { usePokemonStore } from "../store/pokemonStore";
import { useFavoriteStore } from "../store/favoriteStore";
import { useAuthStore } from "../store/authStore";
import PokemonCard from "../components/PokemonCard";
import { ChevronLeft, ChevronRight, Search, X, Heart } from "lucide-react";
import Select from "../components/Select";

const HomePage = () => {
  const {
    pokemons,
    fetchPokemons,
    fetchTypes,
    types,
    isLoading,
    page,
    totalPages,
  } = usePokemonStore();
  const { favorites, fetchFavorites } = useFavoriteStore();
  const { isAuthenticated } = useAuthStore();

  const [search, setSearch] = useState("");
  const [type, setType] = useState("");
  const [sort, setSort] = useState("");
  const [showFavorites, setShowFavorites] = useState(false);

  useEffect(() => {
    fetchTypes();
    fetchPokemons({ page: 1, limit: 12 });
  }, [fetchTypes, fetchPokemons]);

  const buildParams = (overrides = {}) => ({
    page: 1,
    limit: 12,
    search,
    type,
    sort,
    ...overrides,
  });

  const handleSearch = (e) => {
    e.preventDefault();
    setShowFavorites(false);
    fetchPokemons(buildParams());
  };

  const handleClearSearch = () => {
    setSearch("");
    setShowFavorites(false);
    fetchPokemons(buildParams({ search: "" }));
  };

  const handleTypeChange = (newType) => {
    setType(newType);
    setShowFavorites(false);
    fetchPokemons(buildParams({ type: newType }));
  };

  const handleSortChange = (newSort) => {
    setSort(newSort);
    setShowFavorites(false);
    fetchPokemons(buildParams({ sort: newSort }));
  };

  const handlePageChange = (newPage) => {
    fetchPokemons(buildParams({ page: newPage }));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleToggleFavorites = () => {
    if (!showFavorites) {
      fetchFavorites();
    }
    setShowFavorites(!showFavorites);
  };

  const displayedPokemon = showFavorites
    ? favorites.map((f) => ({
        id: f.pokemonId,
        name: f.name,
        image: f.image,
      }))
    : pokemons;

  if (isLoading && pokemons.length === 0) return null;

  return (
    <>
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        {isAuthenticated && (
          <button
            onClick={handleToggleFavorites}
            className={`flex items-center gap-2 py-3 px-4 bg-gray-800 rounded-xl border-2 transition duration-200 hover:cursor-pointer ${
              showFavorites
                ? "bg-red-300 text-gray-700 border-red-300 font-bold"
                : "border-gray-700 text-gray-300 hover:border-red-300 hover:text-red-300"
            }`}
          >
            <Heart size={18} className={showFavorites ? "fill-gray-700" : ""} />
            Favorites
          </button>
        )}
        {!showFavorites && (
          <form onSubmit={handleSearch} className="relative flex-1">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
            />
            <input
              type="text"
              placeholder="Search Pokemon..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-10 py-3 bg-gray-800 bg-opacity-50 backdrop-blur-2xl rounded-xl border-2 border-gray-700 text-gray-300 placeholder-gray-500 focus:outline-none focus:border-red-300 transition duration-200"
            />
            {search && (
              <button
                type="button"
                onClick={handleClearSearch}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-red-300 transition hover:cursor-pointer"
              >
                <X size={18} />
              </button>
            )}
          </form>
        )}

        {!showFavorites && (
          <Select
            value={type}
            onChange={handleTypeChange}
            options={types.map((t) => ({
              value: t,
              label: t.charAt(0).toUpperCase() + t.slice(1),
            }))}
            placeholder="All Types"
            disabled={showFavorites}
          />
        )}
        {!showFavorites && (
          <Select
            value={sort}
            onChange={handleSortChange}
            options={[
              { value: "name", label: "Name A–Z" },
              { value: "-name", label: "Name Z–A" },
            ]}
            placeholder="Default Order"
            disabled={showFavorites}
          />
        )}
      </div>

      {displayedPokemon.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-400 text-lg">
            {showFavorites ? "No favorites yet" : "No Pokemon found"}
          </p>
          <p className="text-gray-500 text-sm mt-1">
            {showFavorites
              ? "Click the heart on any Pokemon to add it"
              : "Try a different search or filter"}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {displayedPokemon.map((pokemon) => (
            <PokemonCard key={pokemon.id} pokemon={pokemon} />
          ))}
        </div>
      )}

      {!showFavorites && totalPages > 1 && (
        <div className="flex items-center justify-center gap-4 mt-8">
          <button
            onClick={() => handlePageChange(page - 1)}
            disabled={page <= 1}
            className="p-2 rounded-xl border-2 border-red-300 text-red-300 hover:bg-red-300 hover:text-gray-700 disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-red-300 disabled:cursor-not-allowed transition duration-200 hover:cursor-pointer"
          >
            <ChevronLeft size={20} />
          </button>

          <span className="text-gray-300 font-bold">
            {page} / {totalPages}
          </span>

          <button
            onClick={() => handlePageChange(page + 1)}
            disabled={page >= totalPages}
            className="p-2 rounded-xl border-2 border-red-300 text-red-300 hover:bg-red-300 hover:text-gray-700 disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-red-300 disabled:cursor-not-allowed transition duration-200 hover:cursor-pointer"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      )}
    </>
  );
};

export default HomePage;
