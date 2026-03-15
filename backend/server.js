const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productsRoutes");
const CartRoutes = require("./routes/CartRoutes");
const CheckoutRoutes = require("./routes/CheckoutRoutes");
const OrderRoutes = require("./routes/orderRoutes");
const UploadRoutes = require("./routes/uploadRoutes");
const SubscribeRoutes = require("./routes/SubscriberRoute");
const AdminRoutes = require("./routes/Adminroutes");
const ProductAdminRoutes =  require("./routes/ProductAdminRoutes")
const AdminOrderRoutes = require("./routes/AdminOrderRoute")


const app = express();
app.use(express.json());
app.use(cors());

dotenv.config();

const PORT = process.env.PORT || 3000;

//connect to mongoDB Database
connectDB();

app.get("/", (req, res) => {
  res.send("Welcom to WearX API");
});

// API Routes
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", CartRoutes);
app.use("/api/checkout", CheckoutRoutes);
app.use("/api/orders", OrderRoutes);
app.use("/api/upload", UploadRoutes);
app.use("/api/subscribe", SubscribeRoutes)

//Admin 
app.use("/api/admin/users", AdminRoutes)
app.use("/api/admin/products", ProductAdminRoutes)
app.use("/api/admin/orders", AdminOrderRoutes)



app.listen(PORT, () => {
  console.log(`server is running on http://localhost:${PORT}`);
});
