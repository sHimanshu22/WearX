const express = require("express");
const mongoose = require("mongoose");
const Cart = require("../models/Cart");
const Product = require("../models/product");

const router = express.Router();

// Helper function
const getCart = async (userId, guestId) => {
  if (userId && mongoose.Types.ObjectId.isValid(userId)) {
    return await Cart.findOne({ user: userId });
  } else if (guestId) {
    return await Cart.findOne({ guestId });
  }
  return null;
};

// ================= ADD TO CART =================
router.post("/", async (req, res) => {
  const { productId, quantity, size, color, guestId, userId } = req.body;

  try {
    if (!productId || !quantity || !size || !color) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product Not Found" });
    }

    let cart = await getCart(userId, guestId);

    if (!cart) {
      const validUserId =
        userId && mongoose.Types.ObjectId.isValid(userId)
          ? userId
          : undefined;

      cart = await Cart.create({
        user: validUserId,
        guestId: guestId || `guest_${Date.now()}`,
        products: [],
        totalPrice: 0,
      });
    }

    const index = cart.products.findIndex(
      (p) =>
        p.productId.toString() === productId &&
        p.size === size &&
        p.color === color
    );

    if (index > -1) {
      cart.products[index].quantity += Number(quantity);
    } else {
      cart.products.push({
        productId,
        name: product.name,
        image: product.images?.[0]?.url,
        price: product.price,
        size,
        color,
        quantity: Number(quantity),
      });
    }

    cart.totalPrice = cart.products.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );

    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    console.error("ADD TO CART ERROR:", error);
    res.status(500).json({ message: error.message });
  }
});

// ================= UPDATE CART =================
router.put("/", async (req, res) => {
  const { productId, quantity, size, color, guestId, userId } = req.body;

  try {
    const cart = await getCart(userId, guestId);
    if (!cart) return res.status(404).json({ message: "Cart Not Found" });

    const index = cart.products.findIndex(
      (p) =>
        p.productId.toString() === productId &&
        p.size === size &&
        p.color === color
    );

    if (index === -1) {
      return res.status(404).json({ message: "Product Not Found in Cart" });
    }

    if (quantity > 0) {
      cart.products[index].quantity = Number(quantity);
    } else {
      cart.products.splice(index, 1);
    }

    cart.totalPrice = cart.products.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );

    await cart.save();
    res.json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

// ================= DELETE ITEM =================
router.delete("/", async (req, res) => {
  console.log("REQ BODY:", req.body);
  const { productId, size, color, guestId, userId } = req.body;

  try {
    const cart = await getCart(userId, guestId);
    if (!cart) return res.status(404).json({ message: "Cart Not Found" });

    cart.products = cart.products.filter(
      (p) =>
        !(
          p.productId.toString() === productId &&
          p.size === size &&
          p.color === color
        )
    );

    cart.totalPrice = cart.products.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );

    await cart.save();
    res.json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

// ================= GET CART =================
router.get("/", async (req, res) => {
  const { userId, guestId } = req.query;

  try {
    const cart = await getCart(userId, guestId);
    if (!cart) {
      return res.status(404).json({ message: "Cart Not Found" });
    }

    res.json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

// ================= MERGE CART =================
router.post("/merge", async (req, res) => {
  const { guestId, userId } = req.body;

  try {
    if (!guestId || !userId) {
      return res.status(400).json({ message: "Missing guestId or userId" });
    }

    const guestCart = await Cart.findOne({ guestId });
    let userCart = await Cart.findOne({ user: userId });

    if (!guestCart) {
      return res.status(404).json({ message: "Guest cart not found" });
    }

    // If user has no cart → assign guest cart to user
    if (!userCart) {
      guestCart.user = userId;
      guestCart.guestId = undefined;
      await guestCart.save();
      return res.json(guestCart);
    }

    // Merge products
    guestCart.products.forEach((guestItem) => {
      const index = userCart.products.findIndex(
        (item) =>
          item.productId.toString() === guestItem.productId.toString() &&
          item.size === guestItem.size &&
          item.color === guestItem.color
      );

      if (index > -1) {
        userCart.products[index].quantity += guestItem.quantity;
      } else {
        userCart.products.push(guestItem);
      }
    });

    // Recalculate total
    userCart.totalPrice = userCart.products.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );

    await userCart.save();

    // Delete guest cart
    await Cart.deleteOne({ guestId });

    res.json(userCart);
  } catch (error) {
    console.error("MERGE CART ERROR:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;