import { Router } from "express";
import { getEvents, deleteEvent } from "../controllers/activity.controller.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();

router.get("/", requireAuth, getEvents);
router.delete("/:eventId", requireAuth, deleteEvent);

export default router;
