import { Schema, model } from "mongoose";

const FavoriteSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  pokemonId: { type: Number, required: true },
  name: { type: String, required: true },
  image: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

FavoriteSchema.index({ userId: 1, pokemonId: 1 }, { unique: true });

export default model("Favorite", FavoriteSchema);
