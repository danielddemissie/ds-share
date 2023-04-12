import mongoose from "mongoose";

const imageSchema = new mongoose.Schema(
  {
    cid: {
      type: String,
      required: true,
    },
    userId: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model("User", imageSchema);
