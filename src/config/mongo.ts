import mongoose from "mongoose";
mongoose.set('strictQuery', false);

export const connection = async () =>{
    return await mongoose.connect(process.env.MONGO_HOST_URI)
}