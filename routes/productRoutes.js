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
router.get("/", getProducts);
router.get("/:slug", protect, getProductBySlug);
router.post("/create", protect, createProduct);
router.put("/:slug", protect, updateProduct);

// delete many resources
router.post("/delete", protect, deleteProduct);
// delete a single resource
// router.delete("/:slug", protect, deleteProduct);

export default router;
