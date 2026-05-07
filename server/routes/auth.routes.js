import { Router } from "express";
import { register, unregister, login, logout, me } from "../controllers/auth.controller.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);

router.delete("/unregister", requireAuth, unregister);
router.get("/me", requireAuth, me);
router.post("/logout", requireAuth, logout);

export default router;
