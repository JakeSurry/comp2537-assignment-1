import { Router } from "express";
import {
  getFavorites,
  addFavorite,
  removeFavorite,
} from "../controllers/favorite.controller.js";
import { requireAuth } from "../middleware/auth.js";
import { validateFavorite } from "../middleware/validate.js";

const router = Router();

router.use(requireAuth);

router.get("/", getFavorites);
router.post("/", validateFavorite, addFavorite);
router.delete("/:pokemonId", removeFavorite);

export default router;
