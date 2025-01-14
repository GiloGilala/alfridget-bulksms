//@/lib/dbConn
import mongoose from "mongoose";

// const MONGODB_URI =
//   process.env.NODE_ENV === "production"
//     ? process.env.MONGODB
//     : process.env.MONGODB_LOCAL_URI;
const MONGODB_URI = process.env.MONGODB_LOCAL_URI;

if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env"
  );
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

const connectDB = async () => {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    mongoose.set("strictQuery", true);
    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      console.log("Connected to MongoDB.");
      return mongoose;
    });
  }

  try {
    cached.conn = await cached.promise;

    // Event handling for disconnection
    cached.conn.connection.on("disconnected", () => {
      console.log("MongoDB disconnected!");
      cached.conn = null;
      cached.promise = null;
    });

    // Event handling for errors
    cached.conn.connection.on("error", (err) => {
      console.error("MongoDB connection error:", err);
      cached.conn = null;
      cached.promise = null;
    });

    return cached.conn;
  } catch (e) {
    cached.promise = null;
    throw e;
  }
};

export default connectDB;
