const mongoose = require("mongoose")

const connectDB = async() => {
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log('your majesty database is connected successfully ')
    } catch (error) {
       console.log("MONGODB connection failed.", error) 
    }
}

module.exports = connectDB;