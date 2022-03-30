import express from "express";
const router = express.Router();
import {
  getProducts,
  getProductBySlug,
  deleteProduct,
  createProduct,
  updateProduct,
} from "../controllers/productControllers.js";
import { protect } from "../middlewares/userMiddleware.js";

// Protected Route
router.get("/", protect, getProducts);
router.get("/:slug", protect, getProductBySlug);
router.post("/", protect, createProduct);
router.put("/:slug", protect, updateProduct);
router.delete("/:slug", protect, deleteProduct);

export default router;
