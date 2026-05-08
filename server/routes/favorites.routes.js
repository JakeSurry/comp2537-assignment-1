import { Router } from "express";
import {
  getFavorites,
  addFavorite,
  removeFavorite,
} from "../controllers/favorite.controller.js";
import { requireAuth } from "../middleware/auth.js";
import { validateFavorite } from "../middleware/validate.js";

const router = Router();

router.get("/", requireAuth, getFavorites);
router.post("/", requireAuth, validateFavorite, addFavorite);
router.delete("/:pokemonId", requireAuth, removeFavorite);

export default router;
