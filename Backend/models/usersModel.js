import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import Jwt  from "jsonwebtoken";
import crypto from 'crypto';


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
        unique: true,
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
      resetPasswordToken:String,
      resetPasswordExpire:Date,
})
userSchema.pre("save",async function(next){
    if(!this.isModified("password")){
        next();
    }
    this.password = await bcrypt.hash(this.password,10)
})

//JWT Token
userSchema.methods.getJWTToken = function (){
    return Jwt.sign({id:this._id}, process.env.JWT_SECRET,{
        expiresIn: process.env.JWT_EXPIRE,
    });
};

//compare password
userSchema.methods.comparePassword = async function(password){
return await bcrypt.compare(password,this.password)
    
}

//Generating password rest token
userSchema.methods.getResetPassToken = function(){

    //generating token
    const resetToken = crypto.randomBytes(20).toString('hex');

    //Hashing and adding to userSchema
    this.resetPasswordToken = crypto
    .createHash('sha256').update(resetToken).digest('hex');
    this.resetPasswordExpire = Date.now() + 15 * 60*1000;
    return resetToken;

};
export default mongoose.model("User",userSchema);