import app from './app.js';
import dotenv from 'dotenv';
import connectDB from './config/database.js';

dotenv.config({path:"backend/config/config.env"});

//connecting to database
connectDB();


app.listen(process.env.PORT,()=>{
    console.log(`Server is running at https://localhost: ${process.env.PORT} `);
})