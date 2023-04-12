import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  links: {
    type: [
      {
        title: String,
        url: String,
        isPrivate: Boolean,
      },
    ],
    default: [],
  },
});

export default mongoose.models.User || mongoose.model("User", userSchema);
