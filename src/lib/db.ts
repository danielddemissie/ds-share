import mongoose from "mongoose";

const MONGODB_URI = "mongodb://localhost:27017/mydatabase";

async function dbConnect() {
  try {
    if (mongoose.connection.readyState >= 1) {
      return;
    }

    await mongoose.connect(MONGODB_URI, {});
  } catch (err) {
    console.error("Failed to connect to MongoDB:", err);
    throw err;
  }
}

export default dbConnect;
