import ErrorHander from "../utils/errorhander.js";
import catchAsynchError from "../middleware/catchAsynchError.js";
import usersModel from "../models/usersModel.js";
import sendToken from "../utils/jwtToken.js";



// Register user 
    const registerUser = catchAsynchError(async(req,res,next)=>{
            const {name, email, password} =req.body;
            const user = await usersModel.create({
                name, email, password,
                avatar:{
                    public_id: "Profile Pic Id",
                    url:"profile pic url"
                }
            });
            sendToken(user,201,res);
        });

// Login User
const loginUser = catchAsynchError(async(req,res,next)=>{
            const {email, password} = req.body;
            if(!email||!password){
                return next(new ErrorHander("Password or Email Missing", 400))
            }
            const user = await usersModel.findOne({email}).select("+password");
            if(!user){
                return next(new ErrorHander("Invalid email or password",401));
            }
            const isPasswordMatched = await user.comparePassword(password);
            
            if(!isPasswordMatched){
                return next(new ErrorHander("Invalid email or password",401));
            }

        sendToken(user,200,res);
})

export default {
    registerUser,
    loginUser
};