import mongoose from "mongoose";

const imageSchema = new mongoose.Schema({
  ipfsHash: {
    type: String,
    required: true,
  },
  pinSize: {
    type: Number,
    required: true,
  },
  userId: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  timestamp: {
    type: String,
    required: true,
  },
});

export default mongoose.models.Image || mongoose.model("Image", imageSchema);
