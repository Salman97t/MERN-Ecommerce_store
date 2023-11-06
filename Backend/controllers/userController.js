import ErrorHander from "../utils/errorhander";
import asynchErrorHandler from "../middleware/catchAsynchError";
import usersModel from "../models/usersModel";


// Register user 
    const regiterUser = asynchErrorHandler(
        async(req,res,next)=>{
            const {name, email, password} = await usersModel.create({
                name, email, password,
                avatar:{
                    public_id: "Profile Pic Id",
                    url:"profile pic url"
                }
            });
            res.status(201).json({
                success:true,
                usersModel
            })
        }
    )