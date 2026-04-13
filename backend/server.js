const express = require("express");
const cors = require("cors")
const app = express();
const dotenv = require("dotenv");
const connectDB = require("./confing/db")
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const cartRoutes  = require("./routes/CartRoutes")
const checkoutRoutes= require("./routes/CheckoutRoutes")
const orderRoutes = require("./routes/OrderRoutes")
const uploadRoutes = require("./routes/uploadRoutes")
const subscribeRoutes = require("./routes/SubscriberRouter")
const adminRoutes = require("./routes/adminRoutes")
const productAdminRoutes = require("./routes/ProductAdminRoutes")
const adminOrderRoutes = require("./routes/adminOrderRoutes")


app.use(express.json())
app.use(cors());
dotenv.config();


const PORT = process.env.PORT || 3000 ;

// Connect the Mongodb database
connectDB();
app.get("/",(req,res)=>{
    res.send("Welcome to FashionCamp")
})

// Api routes 
app.use("/api/users", userRoutes)
app.use("/api/products", productRoutes)
app.use("/api/cart", cartRoutes)
app.use("/api/checkout", checkoutRoutes)
app.use("/api/orders",orderRoutes)
app.use("/api/upload",uploadRoutes)
app.use("/api",subscribeRoutes)

//Admin routes
app.use("/api/admin/users",adminRoutes)
app.use("/api/admin/products",productAdminRoutes)
app.use("/api/admin/orders",adminOrderRoutes)
app.listen(PORT,(req,res)=>{
    console.log(`server is running on port http://localhost${PORT}`)
})