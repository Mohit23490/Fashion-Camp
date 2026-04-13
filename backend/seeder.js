const mongoose = require ("mongoose")
const dotenv = require("dotenv")
const Product = require("./models/product.model")
const User = require("./models/user.Schema")
const Cart = require("./models/Cart.model")
const products = require("./data/products")

dotenv.config()

// connect to mongodb 
mongoose.connect(process.env.MONGODB_URI)

// Function to Seed the Data. 
const seedData = async () => {
    try {
        // clear existing data 
        await Product.deleteMany();
        await User.deleteMany();
        await Cart.deleteMany();

        // create a default admin user. 
        const createdUser = await User.create(
            {
            name:"Admin User",
            email:"admin@example.com",
            password:"123456",
            role:"admin"
            }
        )
        // Assign the Default UserId to each Product 
        const userId = createdUser._id;
        const sampleProducts = products.map((product)=>{
            return {...product,user: userId , }
        })

     // Insert the product into Database
     await Product.insertMany(sampleProducts);
     console.log("Product data Seeded Successfully!");
     process.exit();
    }
    catch (error) {
        console.error("Error seeding the data: ",error);
        process.exit(1)
  }
}

seedData();