const mongoose = require("mongoose");

const connectDB = async () =>{
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Mongo DB Connected Succesfully");
    }catch(err){
        console.error("MongoDB Connection Failed...! ", err);
        process.exit(1);

    }
};
console.log(process.env.MONGO_URI);

module.exports = connectDB;