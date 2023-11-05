import mongoose from "mongoose";

const connectDB =()=>{
    mongoose.connect(process.env.Mongo_URI,{useNewUrlParser:true,useUnifiedTopology:true}).then((data)=>{
        console.log(`MongoDB connected with server ${data.connection.host}. `);
    })
}
export default connectDB;