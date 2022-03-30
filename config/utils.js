import mongoose from "mongoose";
import Jwt from "jsonwebtoken";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

const generateToken = (id, username) => {
  return Jwt.sign({ id, username }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

export { connectDB, mongoose, generateToken };
