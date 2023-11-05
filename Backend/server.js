import app from './app.js';
import dotenv from 'dotenv';
import connectDB from './config/database.js';

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