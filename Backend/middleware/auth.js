import ErrorHander from '../utils/errorhander.js';
import catchAsynchErrors from './catchAsynchError.js'
import Jwt from 'jsonwebtoken';
import usersModel from '../models/usersModel.js';

const isAuthUser = catchAsynchErrors( async (req,res,next)=>{
    const { token }= req.cookies;
    if(!token){
        return next(new ErrorHander("Please Login to access this resource",401))
    }
    const decodeData = Jwt.verify( token , process.env.JWT_SECRET);
    req.user = await usersModel.findById(decodeData.id);
    next();
})
const authorizedRoles = (...roles) =>{
    return (req,res,next)=>{
        if(!roles.includes(req.user.role)){
           return next( new ErrorHander(`Role: ${req.user.role} is not allowed to access this resource`,403));
        }
        next();
    }
}

export default {isAuthUser,authorizedRoles};