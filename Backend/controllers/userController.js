import ErrorHander from "../utils/errorhander.js";
import catchAsynchError from "../middleware/catchAsynchError.js";
import usersModel from "../models/usersModel.js";


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

            const token = registerUser.getJWTToken()
            res.status(201).json({
                success:true,
                token,
            })
        });

// Login User
const loginUser = catchAsynchError(async(req,res,next)=>{
            const {email, password} = req.body;
            if(!email||!password){
                return next(new ErrorHander("Password or Email Missing", 400))
            }
            const user = usersModel.findOne({email}).select("+password");
            if(!user){
                return next(new ErrorHander("Invalid email or password",401));
            }
            const isPasswordMatched = user.comparePassword();
            
            if(!isPasswordMatched){
                return next(new ErrorHander("Invalid email or password",401));
            }
})

export default {
    registerUser,
    loginUser
};