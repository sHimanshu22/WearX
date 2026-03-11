const express = require("express");
const Cart = require("../models/Cart");
const Product = require("../models/product");
const { protect } = require("../middleware/authMiddleware");
const product = require("../models/product");
const user = require("../models/user");
const products = require("../data/products");

const router = express.Router();

//Helper Function to get a cart by user Id or Guesst ID
const getCart = async (userId, guestId) => {
  if (userId) {
    return await Cart.findOne({ user: userId });
  } else if (guestId) {
    return await Cart.findOne({ guestId });
  }
  return null;
};

//@route POST /api/cart
// @desc Add a product to the cart for a guest or logged in user
//@access public

router.post("/", async (req, res) => {
  const { productId, quantity, size, color, guestId, userId } = req.body;

  try {
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: "product Not Found" });
    }

    //Determine if the user is logged In or Guest
    let cart = await getCart(userId, guestId);

    // if the Cart exists , update it
    if (cart) {
      const productIndex = cart.products.findIndex(
        (p) =>
          p.productId.toString() === productId &&
          p.size === size &&
          p.color === color,
      );

      if (productIndex > -1) {
        //if the Product alredy Exists , update then Quantity
        cart.products[productIndex].quantity += quantity;
      } else {
        //add new product
        cart.products.push({
          productId,
          name: product.name,
          image: product.images?.[0]?.url,
          price: product.price,
          size,
          color,
          quantity,
        });
      }

      // Recalculate the total price
      cart.totalPrice = cart.products.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0,
      );

      await cart.save();

      return res.status(200).json(cart);
    } else {
      // Create a new Cart for the Guest or User
      const newCart = await Cart.create({
        user: userId ? userId : undefined,
        guestId: guestId ? guestId : "guest_" + new Date().getTime(),
        products: [
          {
            productId,
            name: product.name,
            image: product.images?.[0]?.url,
            price: product.price,
            size,
            color,
            quantity,
          },
        ],
        totalPrice: product.price * quantity,
      });

      return res.status(201).json(newCart);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

// @route PUT /api/cart
// @desc Update product quantity in the cart for a guest or logged-in user
//@access Public

router.put("/", async (req, res) => {
  const { productId, quantity, size, color, guestId, userId } = req.body;

  try {
    let cart = await getCart(userId, guestId);

    if (!cart) return res.status(404).json({ message: "Cart not Found" });

    const productIndex = cart.products.findIndex(
      (p) =>
        p.productId.toString() === productId &&
        p.size === size &&
        p.color === color,
    );

    if (productIndex > -1) {
      //Update Quantity
      if (quantity > 0) {
        cart.products[productIndex].quantity = quantity;
      } else {
        cart.products.splice(productIndex, 1); // Remove Product if Quantity is 0
      }

      cart.totalPrice = cart.products.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0,
      );

      await cart.save();

      return res.status(200).json(cart);
    } else {
      return res.status(404).json({ message: "Product Not Found in Cart" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});
module.exports = router;
