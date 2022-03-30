import "dotenv/config";
import express from "express";
import cors from "cors";
import { connectDB } from "./config/util.js";
import userRoutes from "./routes/userRoutes.js";

connectDB();
const app = express();
app.use(express.json());
var corsOptions = {
  origin: "http://localhost:3000",
};
app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

// Home Route
app.get("/", (req, res) => {
  res.send("Welcome to my TeamLance Project...");
});

app.use("/api/user", userRoutes);
app.use("/api/product", productRoutes);

const PORT = process.env.PORT || 5000;
app.listen(
  PORT,
  console.log(
    `${process.env.APP_NAME} is running on PORT: ${PORT}, in MODE: ${process.env.APP_MODE}`
  )
);
export default app;
