import { Schema, model } from "mongoose";

const activityEventSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
    index: true,
  },
  action: { type: String, required: true },
  description: { type: String },
  createdAt: { type: Date, default: Date.now },
  metadata: { type: Schema.Types.Mixed },
});

export default model("ActivityEvent", activityEventSchema);
