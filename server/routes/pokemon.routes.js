import { Router } from "express";
import {
  getPokemons,
  getPokemon,
  getTypes,
} from "../controllers/pokemon.controller.js";

const router = Router();

router.get("/", getPokemons);
router.get("/types", getTypes);
router.get("/:id", getPokemon);

export default router;
