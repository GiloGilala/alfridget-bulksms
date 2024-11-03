import mongoose from "mongoose";

const connectDB = async () => {
  mongoose.set("strictQuery", true);
  // Choose the appropriate MongoDB connection string based on the environment
  const connectionString =
    process.env.NODE_ENV === "production"
      ? process.env.MONGO
      : process.env.MONGODB_LOCAL_URI;

  try {
    await mongoose.connect(connectionString);

    console.log("Connected to MongoDB.");
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
  }

  // Event handling for disconnection
  mongoose.connection.on("disconnected", () => {
    console.log("MongoDB disconnected!");
  });

  // Event handling for errors
  mongoose.connection.on("error", (err) => {
    console.error("MongoDB connection error:", err);
  });
};

export default connectDB;
