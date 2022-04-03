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
router.get("/:slug", getProductBySlug);
router.post("/create", createProduct);
router.put("/:slug", updateProduct);

// delete many resources
router.post("/delete", deleteProduct);
// delete a single resource
// router.delete("/:slug", protect, deleteProduct);

export default router;
