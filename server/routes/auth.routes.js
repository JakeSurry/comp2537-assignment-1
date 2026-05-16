import { Router } from "express";
import {
  register,
  unregister,
  login,
  logout,
  me,
} from "../controllers/auth.controller.js";
import { requireAuth } from "../middleware/auth.js";
import { validateLogin, validateRegister } from "../middleware/validate.js";

const router = Router();

router.post("/register", validateRegister, register);
router.post("/login", validateLogin, login);

router.use(requireAuth);

router.delete("/unregister", unregister);
router.get("/me", me);
router.post("/logout", logout);

export default router;
