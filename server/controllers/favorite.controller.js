import Favorite from "../models/Favorite.js";
import { logEvent } from "../services/activity.service.js";

async function getFavorites(req, res) {
  try {
    const favorites = await Favorite.find({ userId: req.session.userId }).sort({
      createdAt: -1,
    });

    res.status(200).send({
      success: true,
      message: `Found ${favorites.length} favorite(s)`,
      favorites,
    });
  } catch (err) {
    console.error("Get favorites error:", err);
    res
      .status(500)
      .send({ success: false, message: "Server error fetching favorites" });
  }
}

async function addFavorite(req, res) {
  try {
    const { pokemonId, name, image } = req.body;

    if (!pokemonId || !name) {
      return res
        .status(400)
        .send({ success: false, message: "Pokemon ID and name are required" });
    }

    const exists = await Favorite.findOne({
      userId: req.session.userId,
      pokemonId,
    });
    if (exists) {
      return res
        .status(409)
        .send({ success: false, message: "Already in favorites" });
    }

    const favorite = await Favorite.create({
      userId: req.session.userId,
      pokemonId,
      name,
      image,
    });

    const log = await logEvent(
      req.session.userId,
      "add_favorite",
      `Added ${name} to favorites`,
    );

    res.status(201).send({
      success: true,
      message: `${name} added to favorites`,
      log,
    });
  } catch (err) {
    console.error("Add favorite error:", err);
    res
      .status(500)
      .send({ success: false, message: "Server error adding favorite" });
  }
}

async function removeFavorite(req, res) {
  try {
    const { pokemonId } = req.params;

    const favorite = await Favorite.findOne({
      userId: req.session.userId,
      pokemonId: parseInt(pokemonId),
    });

    if (!favorite) {
      return res
        .status(404)
        .send({ success: false, message: "Favorite not found" });
    }

    await favorite.deleteOne();

    const log = await logEvent(
      req.session.userId,
      "remove_favorite",
      `Removed ${favorite.name} from favorites`,
    );

    res.status(200).send({
      success: true,
      message: `${favorite.name} removed from favorites`,
      log,
    });
  } catch (err) {
    console.error("Remove favorite error:", err);
    res
      .status(500)
      .send({ success: false, message: "Server error removing favorite" });
  }
}

export { getFavorites, addFavorite, removeFavorite };
