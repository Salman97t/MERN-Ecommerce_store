import mongoose from "mongoose";


const productSchema= new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please Enter Name for product"],
        trim:true
    },
    description:{ 
        type:String,
        required:[true,"Please Enter Description for product"],
    },
    price:{
        type:Number,
        required:true,
        maxLength: [4, "Price of product should not exceed 4 digits"]
    },
    rating:{
        type:Number,
        default:0,
    },
    images:[
      {  public_id:{
            type:String,
            required:true,
        },
        url:{
            type:String,
            required:true,
        }
      }
    ],
    category:{
        type:String,
        required:[true, "Please enter category of product"]
    },
    stock:{
        type:String,
        required:[true, "Please enter porduct stock"],
        maxLength:[50,"Stock cannot exceed 50 items"],
        default:1
    },
    numberOfReviews:{
        type:Number,
        default:0
    },
    reviews:[
        {
            name:{
                type:String,
                required:true,
            },
            rating:{
                type:Number,
                required:true
            },
            comment:{
                type:String,
                required:true
            }
        }
    ],
    user:{
        type:mongoose.Schema.ObjectId,
        ref:"User",
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
})
export default mongoose.model("Product",productSchema);