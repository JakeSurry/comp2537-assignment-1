import dotenv from "dotenv";
dotenv.config({ path: ".env" });

import express from "express";
import { setServers } from "dns";
import cors from "cors";
import helmet from "helmet";

import connectDB from "./config/db.js";
import configureSession from "./config/session.js";
import { authLimiter, apiLimiter } from "./middleware/rateLimiter.js";

import authRoutes from "./routes/auth.routes.js";
import eventRoutes from "./routes/activity.routes.js";
import favoriteRoutes from "./routes/favorites.routes.js";
import pokemonRoutes from "./routes/pokemon.routes.js";
import adminRoutes from "./routes/admin.routes.js";

const app = express();
const PORT = process.env.PORT || 3000;

setServers(["8.8.8.8", "8.8.4.4"]);

app.set("trust proxy", 1);
app.use(
  cors({
    origin: process.env.CLIENT_URL.split(","),
    credentials: true,
  }),
);
app.use(helmet());
app.use(express.json());

app.use(configureSession());

app.use("/auth", authLimiter, authRoutes);
app.use("/activity", apiLimiter, eventRoutes);
app.use("/favorites", apiLimiter, favoriteRoutes);
app.use("/pokemon", apiLimiter, pokemonRoutes);
app.use("/admin", adminRoutes)

app.get("/", (req, res) => res.send("Auth server running"));

connectDB().then(() => {
  app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
});
