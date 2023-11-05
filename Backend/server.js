import app from './app.js';
import dotenv from 'dotenv';
import connectDB from './config/database.js';


//handling uncaught errors
process.on("uncaughtException",(err)=>{
    console.log(`Error:${err.message}`)
    console.log(`Shutting down server due to unhandled uncaught errors`)
    process.exit(1);
})

//configuring dot env
dotenv.config({path:"backend/config/config.env"});

//connecting to database
connectDB();


const server = app.listen(process.env.PORT,()=>{
    console.log(`Server is running at https://localhost: ${process.env.PORT} `);
})

// Server error handling
// Unhandled Promise Rejection
process.on("unhandledRejection",(err)=>{
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down server due to unhandled promise rejection`)
    server.close(()=>{
        process.exit(1);
    })
})