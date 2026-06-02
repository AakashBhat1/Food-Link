import mongoose from "mongoose";

export const useMemoryDB =
  process.env.USE_MEMORY_DB === "true" ||
  !process.env.MONGO_URL ||
  process.env.MONGO_URL === "YOUR_DATABASE_URL";

export const connectDB = async () => {
  if (useMemoryDB) {
    console.log("Using in-memory demo database");
    return;
  }

  await mongoose
    .connect(
      process.env.MONGO_URL
    )
    .then(() =>console.log("DB Connected"));
};
