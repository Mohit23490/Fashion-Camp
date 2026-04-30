// const express = require("express");
// const cors = require("cors")
// const app = express();
// const dotenv = require("dotenv");
// const connectDB = require("./confing/db")
// const userRoutes = require("./routes/userRoutes");
// const productRoutes = require("./routes/productRoutes");
// const cartRoutes  = require("./routes/CartRoutes")
// const checkoutRoutes= require("./routes/CheckoutRoutes")
// const orderRoutes = require("./routes/OrderRoutes")
// const uploadRoutes = require("./routes/uploadRoutes")
// const subscribeRoutes = require("./routes/SubscriberRouter")
// const adminRoutes = require("./routes/adminRoutes")
// const productAdminRoutes = require("./routes/ProductAdminRoutes")
// const adminOrderRoutes = require("./routes/adminOrderRoutes")


// app.use(express.json())
// app.use(cors());
// dotenv.config();


// const PORT = process.env.PORT || 3000 ;

// // Connect the Mongodb database
// connectDB();
// app.get("/",(req,res)=>{
//     res.send("Welcome to FashionCamp")
// })

// // Api routes 
// app.use("/api/users", userRoutes)
// app.use("/api/products", productRoutes)
// app.use("/api/cart", cartRoutes)
// app.use("/api/checkout", checkoutRoutes)
// app.use("/api/orders",orderRoutes)
// app.use("/api/upload",uploadRoutes)
// app.use("/api",subscribeRoutes)

// //Admin routes
// app.use("/api/admin/users",adminRoutes)
// app.use("/api/admin/products",productAdminRoutes)
// app.use("/api/admin/orders",adminOrderRoutes)
// app.listen(PORT,(req,res)=>{
//     console.log(`server is running on port http://localhost${PORT}`)
// })
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config(); // ⚠️ Move this to the TOP before anything else

const connectDB = require("./confing/db");
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const cartRoutes = require("./routes/CartRoutes");
const checkoutRoutes = require("./routes/CheckoutRoutes");
const orderRoutes = require("./routes/OrderRoutes");
const uploadRoutes = require("./routes/uploadRoutes");
const subscribeRoutes = require("./routes/SubscriberRouter");
const adminRoutes = require("./routes/adminRoutes");
const productAdminRoutes = require("./routes/ProductAdminRoutes");
const adminOrderRoutes = require("./routes/adminOrderRoutes");

const app = express();

// ─── Middlewares ────────────────────────────────────────────────────────────
app.use(express.json());
app.use(cors({
  origin: [
    "https://fashion-camp-9p4s.vercel.app", // your frontend
    "http://localhost:5173",                  // vite dev
    "http://localhost:3000",
  ],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

// ─── Database ────────────────────────────────────────────────────────────────
connectDB();

// ─── Routes ──────────────────────────────────────────────────────────────────
app.get("/", (req, res) => {
  res.send("Welcome to FashionCamp");
});

app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/checkout", checkoutRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api", subscribeRoutes);

// ─── Admin Routes ─────────────────────────────────────────────────────────────
app.use("/api/admin/users", adminRoutes);
app.use("/api/admin/products", productAdminRoutes);
app.use("/api/admin/orders", adminOrderRoutes);

// ─── Start Server ─────────────────────────────────────────────────────────────
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`); // ⚠️ fixed missing colon
});