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
            res.status(201).json({
                success:true,
                user
            })
        });

export default {registerUser};