import { mongoose } from "../config/utils.js";
const productSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      required: true,
      ref: "User", //user model
    },
    name: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
    },
    category: {
      type: String,
      required: true,
    },
    category_id: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      default: 0,
    },
    status: {
      type: String,
      required: true,
    },
    date: { type: String },
  },
  {
    timestamps: true,
  }
);
const Product = mongoose.model("Product", productSchema);
export default Product;
