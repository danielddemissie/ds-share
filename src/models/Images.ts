import mongoose from "mongoose";

export interface Image {
  IpfsHash: string;
  PinSize: number;
  Timestamp: string;
}

const imageSchema = new mongoose.Schema({
  IpfsHash: {
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

export default mongoose.models.User || mongoose.model("User", imageSchema);
