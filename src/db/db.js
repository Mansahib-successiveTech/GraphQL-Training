import mongoose from "mongoose";
export const connectionDb=async()=>{
    try{
        await mongoose.connect("mongodb://localhost:27017/users")
        console.log("connected to db");  
    }catch(err){
        console.log("error connecting db");
    }
}