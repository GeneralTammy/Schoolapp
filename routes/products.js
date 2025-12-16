import express from "express";
import Product from "../models/products.js"; // Ensure consistency in naming

const router = express.Router();

// 1. Create Product (POST)
router.post("/add", async (req, res, next) => {
  try {
    const { name, price, category, description } = req.body;
    const newProduct = await Product.create({
      name,
      price,
      category,
      description,
    });
    res.status(201).json({ message: "Product added", product: newProduct });
  } catch (err) {
    next(err);
  }
});

// 2. Get All Products (GET)
router.get("/", async (req, res, next) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    next(err);
  }
});

// 3. Full Update/Replace (PUT)
// Replaces the entire document with the new data provided.
router.put("/:id", async (req, res, next) => {
  try {
    const updatedProduct = await Product.findOneAndReplace(
      { _id: req.params.id },
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedProduct)
      return res.status(404).json({ message: "Product not found" });
    res.json({ message: "Product fully replaced", product: updatedProduct });
  } catch (err) {
    next(err);
  }
});

// 4. Partial Edit (PATCH)
// Only updates specific fields sent in the request body.
router.patch("/:id", async (req, res, next) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );
    if (!updatedProduct)
      return res.status(404).json({ message: "Product not found" });
    res.json({ message: "Product updated", product: updatedProduct });
  } catch (err) {
    next(err);
  }
});

// 5. Delete Product (DELETE)
router.delete("/:id", async (req, res, next) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct)
      return res.status(404).json({ message: "Product not found" });
    res.status(204).send(); // 204 No Content is standard for success
  } catch (err) {
    next(err);
  }
});

export default router;
