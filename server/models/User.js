import { Schema, model } from "mongoose";
import { hash, compare } from "bcrypt";

const costFactor = 12;

const UserSchema = new Schema(
  {
    username: { type: String, required: true, index: { unique: true } },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  { timestamps: true },
);

UserSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  this.password = await hash(this.password, costFactor);
});

UserSchema.methods.comparePassword = async function (newPassword) {
  return compare(newPassword, this.password);
};

export default model("User", UserSchema);
