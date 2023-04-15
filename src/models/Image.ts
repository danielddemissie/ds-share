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
  ownerId: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  sharedWith: {
    type: [mongoose.Types.ObjectId],
    default: [],
  },
  isDuplicate: {
    type: Boolean,
    default: false,
  },
  isPublic: {
    type: Boolean,
    default: false,
  },
  timestamp: {
    type: String,
    required: true,
  },
});

export default mongoose.models.Image || mongoose.model("Image", imageSchema);
