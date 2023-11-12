import ErrorHander from "../utils/errorhander.js";
import catchAsynchError from "../middleware/catchAsynchError.js";
import usersModel from "../models/usersModel.js";
import sendToken from "../utils/jwtToken.js";
import sendEmail from "../utils/sendEmail.js";
import crypto from "crypto";



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
// Logout 

const logout = catchAsynchError(async(req,res,next)=>{
    res.cookie("token", null,{
        expires: new Date(Date.now()),
        httpOnly:true,
    })
    res.status(200).json({
        success: true,
        message:"Logged Out"
    })
})

// Forget password 
const forgetPassword = catchAsynchError(async (req,res,next)=>{
    const user = await usersModel.findOne({email:req.body.email});
    if(!user){
        return next(new ErrorHander("User Not Found",404));
    }
    //Get resetPassword Token
    const resetToken = user.getResetPassToken();
    await user.save({validateBeforeSave:false});


    const resetPasswordUrl = `${req.protocol}://${req.get("host")}/api/v1/password/reset/${resetToken}`;
    const message =`Your password Rest token is: \n\n ${resetPasswordUrl}\n\n If you have not requested this email than, please ignore it. `;
    try {
        await sendEmail({
            email:user.email,
            subject:`Ecommerce Password Recovery`,
            message,

        })
        res.status(200).json({
            success:true,
            message:`Email sent to ${user.email} successfully`,
        })
    } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save({validateBeforeSave:false});
        return next(new ErrorHander(error.message,500));
    }
}) 

// Rest password 
const restPassword = catchAsynchError(async(req,res,next)=>{

    // Creating token hash
    const  resetPasswordToken = crypto
    .createHash('sha256').update(req.params.token).digest('hex');
    const user = await usersModel.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now()  }
    })
    if(!user){
        return next( new ErrorHander("Reset Password Token is invalid or has been expired", 404))
    }
    if(req.body.password !== req.body.confirmPassword){
        return next (new ErrorHander("Password does not match",400))
    }
    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();
    sendToken(user,200,res);
})

// Get User detail
const getUserDetails= catchAsynchError(async (req,res,next)=>{
    const user = await usersModel.findById(req.user.id);
    res.status(200).json({
        success:true,
        user
    })
})
// Update user password
const updatePassword = catchAsynchError(async (req,res,next)=>{
    const user = await usersModel.findById(req.user.id).select("+password");
    const isPasswordMatched = await user.comparePassword(req.body.oldPassword);
            if(!isPasswordMatched){
                return next(new ErrorHander("Old password is incorrect",401));
            }
            if(req.body.newPassword !== req.body.confirmPassword){
                return next(new ErrorHander("Password does not matched",401));
            }
            user.password = req.body.newPassword
            await user.save();
            sendToken(user, 200,res);
})
// Update User Profile
const updateProfile = catchAsynchError(async (req,res,next)=>{

    const newUserData ={ 
        name:req.body.name,
        email:req.body.email,

    } 
    // iamge update later
    const user =await usersModel.findByIdAndUpdate(req.user.id,newUserData,{
        new:true,
        runValidators:true,
        useFindAndModify:false
    })
        res.status(200).json({
            success:true,
        })
})

// Get all registered users Details (Admin only)
const getRegisteredUser = catchAsynchError( async (req, res,next)=>{
    const users = await usersModel.find();
    res.status(200).json({
        success:true,
        users
    })
})
//Get Single User Detail (Admin)
const getSingleUser = catchAsynchError(async (req,res,next)=>{ 
    const user =await usersModel.findById(req.params.id);

    if(!user){
        return next (new ErrorHander(`User does not exist with the id : ${req.params.id }`))
    }
    
    res.status(200).json({
        success:true,
        user
    })
})

// update User Role -- Admin
const updateUserRole = catchAsynchError(async (req, res, next) => {
    const newUserData = {
      name: req.body.name,
      email: req.body.email,
      role: req.body.role,
    };
  
    await usersModel.findByIdAndUpdate(req.params.id, newUserData, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });
  
    res.status(200).json({
      success: true,
    });
  });
  //Delete User --Admin
  const deleteUser = catchAsynchError(async (req, res, next) => {
    const user = await usersModel.findById(req.params.id);
  
    if (!user) {
      return next(
        new ErrorHander(`User does not exist with Id: ${req.params.id}`, 400)
      );
    }
  
    // const imageId = user.avatar.public_id;
  
    // await cloudinary.v2.uploader.destroy(imageId);
  
    await user.deleteOne();
  
    res.status(200).json({
      success: true,
      message: "User Deleted Successfully",
    });
  });



export default {
    registerUser,
    loginUser,
    logout,
    forgetPassword,
    restPassword,
    getUserDetails,
    updatePassword,
    updateProfile,
    getRegisteredUser,
    getSingleUser,
    updateUserRole,
    deleteUser
};