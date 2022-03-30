import Product from "../models/productModel.js";
import asyncHandler from "express-async-handler";
import { randomString, slugify } from "../config/helper.js";

//@desc fetch all products
//@route GET api/products
//@access private
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find().sort({ updatedAt: -1 });
  res.json(products);
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
  const product = await Product.findOne({ slug: req.params.slug });
  if (product) {
    await product.remove();
    res.json({ message: "Product has been deleted" });
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

//@desc create a single product
//@route CREATE /api/products
//@access private/admin
const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: "Sample name",
    slug: `${slugify("Sample name")}-${randomString(3)}`,
    price: 0,
    user: req.user._id,
    category: "sample category",
    category_id: "sample-category",
    status: "sample-category",
  });
  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

//@desc update a single product
//@route PUT /api/products/;id
//@access private/admin
const updateProduct = asyncHandler(async (req, res) => {
  const {
    name,
    price,
    inflatedPrice,
    description,
    brand,
    category,
    category_slug,
    image,
    images,
    countInStock,
  } = req.body;
  const product = await Product.findOne({ slug: req.params.slug });
  if (product) {
    product.name = name;
    product.slug = slugify(name);
    product.price = price;
    product.inflatedPrice = inflatedPrice;
    product.description = description;
    product.image = image;
    product.images = images;
    product.brand = brand;
    product.category = category;
    product.category_slug = category_slug;
    product.countInStock = countInStock;

    const slugExist = await Product.findOne({ slug: product.slug });
    if (!slugExist) {
      const updatedProduct = await product.save();
      res.status(201).json(updatedProduct);
    } else {
      product.slug = slugify(name) + "-" + randomString(3);
      const updatedProduct = await product.save();
      res.status(201).json(updatedProduct);
    }
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
