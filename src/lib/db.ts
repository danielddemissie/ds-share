import mongoose from "mongoose";

//test

async function dbConnect() {
  try {
    if (mongoose.connection.readyState >= 1) {
      return;
    }

    await mongoose.connect(process.env.MONGODB_URI as string, {});
  } catch (err) {
    console.error("Failed to connect to MongoDB:", err);
    throw err;
  }
}

export default dbConnect;
