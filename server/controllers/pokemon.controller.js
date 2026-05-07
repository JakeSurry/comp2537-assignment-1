import axios from "axios";

const POKEAPI = "https://pokeapi.co/api/v2";

async function getPokemons(req, res) {
  try {
    const {
      page = 1,
      limit = 20,
      search = "",
      type = "",
      sort = "",
    } = req.query;

    let pokemons;

    if (type) {
      const typeRes = await axios.get(`${POKEAPI}/type/${type.toLowerCase()}`);
      pokemons = typeRes.data.pokemon.map((p) => ({
        name: p.pokemon.name,
        id: parseInt(p.pokemon.url.split("/").filter(Boolean).pop()),
      }));
    } else {
      const listRes = await axios.get(`${POKEAPI}/pokemon?limit=1025`);
      pokemons = listRes.data.results.map((p) => ({
        name: p.name,
        id: parseInt(p.url.split("/").filter(Boolean).pop()),
      }));
    }

    if (search) {
      pokemons = pokemons.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase()),
      );
    }

    if (sort === "name") {
      pokemons.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sort === "-name") {
      pokemons.sort((a, b) => b.name.localeCompare(a.name));
    }

    const total = pokemons.length;
    const start = (page - 1) * limit;
    const paginated = pokemons.slice(start, start + parseInt(limit));

    const results = paginated.map((p) => ({
      ...p,
      image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${p.id}.png`,
    }));

    res.status(200).send({
      success: true,
      pokemons: results,
      total,
      page: parseInt(page),
      totalPages: Math.ceil(total / limit),
    });
  } catch (err) {
    console.error("Get pokemons error:", err);
    res
      .status(500)
      .send({ success: false, message: "Server error fetching Pokemon" });
  }
}

async function getPokemon(req, res) {
  try {
    const { id } = req.params;
    const response = await axios.get(`${POKEAPI}/pokemon/${id}`);
    const pokemon = {
      id: response.data.id,
      name: response.data.name,
      types: response.data.types.map((t) => t.type.name),
      image: response.data.sprites.front_default,
      stats: response.data.stats.map((s) => ({
        name: s.stat.name,
        value: s.base_stat,
      })),
    };

    res.status(200).send({ success: true, pokemon });
  } catch (err) {
    console.error("Get pokemon error:", err);
    res
      .status(500)
      .send({ success: false, message: "Server error fetching Pokemon" });
  }
}

async function getTypes(req, res) {
  try {
    const response = await axios.get(`${POKEAPI}/type`);
    const types = response.data.results.map((t) => t.name);

    res.status(200).send({ success: true, types });
  } catch (err) {
    console.error("Get types error:", err);
    res
      .status(500)
      .send({ success: false, message: "Server error fetching types" });
  }
}

export { getPokemons, getPokemon, getTypes };
