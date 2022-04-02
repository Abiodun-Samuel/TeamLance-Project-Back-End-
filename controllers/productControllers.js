import Product from "../models/productModel.js";
import asyncHandler from "express-async-handler";
import { randomString, slugify } from "../config/helper.js";

//@desc fetch all products
//@route GET api/products
//@access private
const getProducts = asyncHandler(async (req, res) => {
  res.json({ message: "ok" });
  // const products = await Product.find().sort({ updatedAt: -1 });
  // res.json(products);
});

//@desc fetch a single product
//@route GET api/products/:slug
//@access private
const getProductBySlug = asyncHandler(async (req, res) => {
  const product = await Product.findOne({ slug: req.params.slug });
  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error("This product is not avalaible in our record");
  }
});

//@desc delete a single product or multiple products
//@route DELETE /api/products/:slug
//@access private
const deleteProduct = asyncHandler(async (req, res) => {
  await Product.deleteMany({
    _id: { $in: [...req.body] },
  });
  res.json({ message: "Product has been deleted" });
});

//@desc create a single product
//@route CREATE /api/products
//@access private/admin
const createProduct = asyncHandler(async (req, res) => {
  // product slug must be unique
  const product = new Product({
    name: req.body.name,
    slug: `${slugify(req.body.name)}-${randomString(3)}`,
    price: req.body.price,
    user: req.user._id,
    category: req.body.category,
    category_id: req.body.category_id,
    status: req.body.status,
    date: new Date(Date.now()).toLocaleDateString(),
  });
  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

//@desc update a single product
//@route PUT /api/products/;id
//@access private/admin
const updateProduct = asyncHandler(async (req, res) => {
  const { name, price, category, category_id, status } = req.body;

  const product = await Product.findOne({ slug: req.params.slug });

  if (product) {
    product.name = name;
    product.price = price;
    product.status = status;
    product.category = category;
    product.category_id = category_id;

    const updatedProduct = await product.save();
    res.status(201).json(updatedProduct);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

export {
  getProducts,
  getProductBySlug,
  deleteProduct,
  createProduct,
  updateProduct,
};
