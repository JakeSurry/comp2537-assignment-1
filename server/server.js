import dotenv from "dotenv";
dotenv.config({ path: ".env" });

import express from "express";
import { setServers } from "dns";
import cors from "cors";
import connectDB from "./config/db.js";
import configureSession from "./config/session.js";

import authRoutes from "./routes/auth.routes.js";
import eventRoutes from "./routes/activity.routes.js";
import favoriteRoutes from "./routes/favorites.routes.js";
import pokemonRoutes from "./routes/pokemon.routes.js";

const app = express();
const PORT = process.env.PORT || 3000;

setServers(["8.8.8.8", "8.8.4.4"]);

app.use(
  cors({
    origin: ["http://localhost:5173", "https://bcit-pokemon-app.netlify.app"],
    credentials: true,
  }),
);

app.use(express.json());
app.use(configureSession());

app.use("/auth", authRoutes);
app.use("/activity", eventRoutes);
app.use("/favorites", favoriteRoutes);
app.use("/pokemon", pokemonRoutes);

app.get("/", (req, res) => res.send("Auth server running"));

connectDB().then(() => {
  app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
});
