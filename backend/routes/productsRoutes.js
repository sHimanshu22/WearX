const express = require("express");
const Product = require("../models/product");
const { protect, admin } = require("../middleware/authMiddleware");
// const admin = require("../middleware/authMiddleware");

const router = express.Router();

//@route POST /api/products
//@desc Create a new Product
//@access Private/Admin
console.log("protect middleware:", protect);
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
      collection,
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
      collection,
      material,
      gender,
      images,
      isFeatured,
      isPublished,
      tags,
      dimensions,
      weight,
      sku,
      user: req.user._id, //Referncces to the Admin User Who Created it
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

// @route PUT /api/product/:id
// @desc Update an Existing product ID
// @access Privaet/Admin

router.put("/:id", protect, admin, async (req, res) => {
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
      collection,
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

    //find product by ID
    const product = await Product.findById(req.params.id);

    if (product) {
      //update product table
      product.name = name || product.name;
      product.description = description || product.description;
      product.price = price || product.price;
      product.discountedPrice = discountedPrice || product.discountedPrice;
      product.countInStock = countInStock || product.countInStock;
      product.category = category || product.category;
      product.brand = brand || product.brand;
      product.sizes = sizes || product.sizes;
      product.colors = colors || product.colors;
      product.collection = collection || product.collection;
      product.material = material || product.material;
      product.gender = gender || product.gender;
      product.images = images || product.images;
      product.isFeatured =
        isFeatured !== undefined
          ? isFeatured
          : product.isFeatured || product.isFeatured;
      product.isPublished =
        isPublished !== undefined
          ? isPublished
          : product.isPublished || product.isPublished;
      product.tags = tags || product.tags;
      product.dimensions = dimensions || product.dimensions;
      product.weight = weight || product.weight;
      product.sku = sku || product.sku;

      // Save the Updated Product
      const updatedProduct = await product.save();
      res.json(updatedProduct);
    } else{
      res.status(404).json({message : "product not Found !"});
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

//@route DELETE /api/products/:id
//@desc delete a product by ID
//@access private/admin
router.delete("/:id", protect, admin, async (req, res) => {
  try{
    //Find the product by ID
    const product = await Product.findById(req.params.id);

    if(product){
      //Remove the Products From DB
      await product.deleteOne();
      res.json({message : "Product Removed"});
    } else{
      res.status(404).json({message : "Product Not Found"})
    }
  }catch(error){
    console.error(error);
    res.status(500).send("server Error");
  }
})

module.exports = router;
