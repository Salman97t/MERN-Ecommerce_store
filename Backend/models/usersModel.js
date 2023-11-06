import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";


const isEmail = validator.isEmail;

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required: [true, "Please Enter your name"],
        maxLength:[30,"Name cannot exceed 30 characters"],
        minLength:[4, "Name must have atleast 4 characters"]
    },
    email:{
        type:String,
        required: [true, "Please Enter your email"],
        validate:[isEmail, "Please enter a valid email"]
    },
    password:{
        type:String,
        required: [true, "Please Enter your password"],
        minLength:[8, "Passwor should be atleast 8 characters"],
        select:false
    },
    avatar:{
          public_id:{
            type:String,
            required:true,
        },
        url:{
            type:String,
            required:true,
        }
    },
    role:{
          type:String,
          default: "user",
      },
      restPasswordToken:String,
      restPasswordExpire:Date,
})
userSchema.pre("save",async function(next){
    if(this.isModified("password")){
        next();
    }
    this.password = await bcrypt.hash(this.password,10)
})
export default mongoose.model("User",userSchema);