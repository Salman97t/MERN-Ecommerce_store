import errorhandler from "../utils/errorhander.js";



    const errorMiddleware = (err,req,res,next)=>{
            err.statusCode = err.statusCode || 500;
            err.message = err.message || "Internal Server Error";

        // wrong MongoDB Id error
        if(err.name === "CastError"){
            const message = `Resource not found. Invalid: ${err.path}`;
            err = new errorhandler(message,400)
        }
        //mongoose duplicate key error
        if(err.code === 11000){
            const message = `Duplicate ${Object.keys(err.keyValue)} entered.`
            err = new errorhandler(message,400)
        }
        // Json web token error
        if(err.code === "JsonWebTokenError"){
            const message = "Json Web Token is invalid. Try again!";
            err = new errorhandler(message,400)
        }
        // JWT token expire
        if(err.code === "TokenExpireError"){
            const message = "Json Web Token is expired. Try again!";
            err = new errorhandler(message,400)
        }
   
        res.status(err.statusCode).json({
            success:false,
            message : err.message,
        });
    }



    export default errorMiddleware;
    