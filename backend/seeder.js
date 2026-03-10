const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Product = require("./models/product");
const User = require("./models/user");
const products = require("./data/products");

dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI);

const seedData = async () => {
  try {
    await Product.deleteMany();
    await User.deleteMany();

    const createdUser = await User.create({
      name: "Admin User",
      email: "admin@example.com",
      password: "123456",
      role: "admin",
    });

    const userID = createdUser._id;

    const sampleProducts = products.map((product) => {
      return { ...product, user: userID };
    });

    await Product.insertMany(sampleProducts);

    console.log("Product Data Seeded Successfully");
    process.exit();
  } catch (error) {
    console.error("Error Seeding the Data:", error);
    process.exit(1);
  }
};

seedData();