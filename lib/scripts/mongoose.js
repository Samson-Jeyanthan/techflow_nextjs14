import mongoose from "mongoose";

import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

let isConnected = false;
const MONGODB_URL = process.env.MONGODB_URL;

export const connectToDatabase = async () => {
  mongoose.set("strict", true);

  if (!MONGODB_URL) {
    return console.log("Missing MONGODB_URL");
  }

  if (isConnected) {
    return console.log("MongoDB is already connected");
  }

  try {
    await mongoose.connect(MONGODB_URL, {
      dbName: "techflow",
    });

    isConnected = true;
    console.log("MongoDB connected");
  } catch (error) {
    console.log("Error connecting to MongoDB: ", error);
  }
};

export const disconnectFromDatabase = async () => {
  if (!isConnected) {
    return console.log("MongoDB is not connected");
  }

  try {
    await mongoose.disconnect();
    isConnected = false;
    console.log("MongoDB disconnected");
  } catch (error) {
    console.log("Error disconnecting from MongoDB: ", error);
  }
};
