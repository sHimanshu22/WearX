const express = require("express");
const Product = require("../models/product");
const { protect, admin } = require("../middleware/authMiddleware");
const mongoose = require("mongoose");
const router = express.Router();

//@route POST /api/products
//@desc Create a new Product
//@access Private/Admin
router.post("/", protect, admin, async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      discountedPrice,
      countInStock,
      category,
      brand,
      sizes,
      colors,
      collections,
      material,
      gender,
      images,
      isFeatured,
      isPublished,
      tags,
      dimensions,
      weight,
      sku,
    } = req.body;

    const product = new Product({
      name,
      description,
      price,
      discountedPrice,
      countInStock,
      category,
      brand,
      sizes,
      colors,
      collections,
      material,
      gender,
      images,
      isFeatured,
      isPublished,
      tags,
      dimensions,
      weight,
      sku,
      user: req.user._id,
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

//@route PUT /api/products/:id
//@desc Update Product
//@access Private/Admin
router.put("/:id", protect, admin, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      Object.assign(product, req.body);

      const updatedProduct = await product.save();
      res.json(updatedProduct);
    } else {
      res.status(404).json({ message: "Product not found!" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

//@route DELETE /api/products/:id
//@desc Delete Product
//@access Private/Admin
router.delete("/:id", protect, admin, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      await product.deleteOne();
      res.json({ message: "Product Removed" });
    } else {
      res.status(404).json({ message: "Product Not Found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

//@route GET /api/products
//@desc Get products with filters
//@access Public
router.get("/", async (req, res) => {
  try {
    const {
      collections,
      size,
      color,
      gender,
      minPrice,
      maxPrice,
      sortBy,
      search,
      category,
      material,
      brand,
      limit,
    } = req.query;

    let query = {};
    let sort = {};

    if (collections && collections !== "all") {
      query.collections = collections;
    }

    if (category) query.category = category;
    if (gender) query.gender = gender;

    if (material) query.material = { $in: material.split(",") };
    if (brand) query.brand = { $in: brand.split(",") };
    if (size) query.sizes = { $in: size.split(",") };
    if (color) query.colors = { $in: [color] };

    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    // Sorting
    if (sortBy === "priceAsc") sort.price = 1;
    if (sortBy === "priceDesc") sort.price = -1;
    if (sortBy === "popularity") sort.rating = -1;

    const products = await Product.find(query)
      .sort(sort)
      .limit(Number(limit) || 0);

    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});


// ================= IMPORTANT ROUTES =================

//@route GET /api/products/best-seller
router.get("/best-seller", async (req, res) => {
  try {
    const bestSeller = await Product.findOne().sort({
      rating: -1,
      numReviews: -1,
    });

    if (bestSeller) {
      res.json(bestSeller);
    } else {
      res.status(404).json({ message: "No Best Seller Found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

//@route GET /api/products/new-arrivals
router.get("/new-arrivals", async (req, res) => {
  try {
    const newArrivals = await Product.find()
      .sort({ createdAt: -1 })
      .limit(8);

    res.json(newArrivals);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

//@route GET /api/products/similar/:id
router.get("/similar/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid Product ID" });
    }

    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product Not Found" });
    }

    const similarProducts = await Product.find({
      _id: { $ne: id },
      gender: product.gender,
      category: product.category,
    }).limit(4);

    res.json(similarProducts);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

//@route GET /api/products/:id
//@desc Get product by ID (KEEP THIS LAST)

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // ✅ FIX: validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid Product ID" });
    }

    const product = await Product.findById(id);

    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: "Product Not Found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

module.exports = router;