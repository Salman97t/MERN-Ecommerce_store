import ErrorHander from '../utils/errorhander.js';
import catchAsynchErrors from './catchAsynchError.js'
import Jwt from 'jsonwebtoken';
import usersModel from '../models/usersModel.js';

const isAuthUser = catchAsynchErrors( async (req,res,next)=>{
    const { token }= req.cookies;
    if(!token){
        return next(new ErrorHander("Please Login to access this resource",401))
    }
    const decodeData = Jwt.verify(token,process.env.JWT_SECRET);
    req.user = await usersModel.findById(decodeData.id);
    next();
})

export default isAuthUser;