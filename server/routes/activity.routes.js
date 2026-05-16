import { Router } from "express";
import { getEvents, deleteEvent } from "../controllers/activity.controller.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();

router.use(requireAuth);

router.get("/", getEvents);
router.delete("/:eventId", deleteEvent);

export default router;
