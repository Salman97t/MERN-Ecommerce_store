import errorhandler from "../utils/errorhander.js";



    const errorMiddleware = (err,req,res,next)=>{
            err.statusCode = err.statusCode || 500;
            err.message = err.message || "Internal Server Error";

        // wrong MongoDB Id error
        if(err.name === "CastError"){
            const message = `Resource not found. Invalid: ${err.path}`;
            err = new errorhandler(message,400)
        }
        res.status(err.statusCode).json({
            success:false,
            message : err.message,
        });
    }

    export default errorMiddleware;
    