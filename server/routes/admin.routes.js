import { Router } from "express";
import {
  getUsers,
  updateUser,
  deleteUser,
} from "../controllers/admin.controller.js";
import { requireRole, requireAuth } from "../middleware/auth.js";

const router = Router();

router.use(requireAuth, requireRole("admin"));

router.get("/users", getUsers);
router.put("/users/:id", updateUser);
router.delete("/users/:id", deleteUser);

export default router;
