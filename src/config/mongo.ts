import mongoose from "mongoose";

export const connection = async () =>{
    return await mongoose.connect(process.env.MONGO_HOST_URI)
}