import express from "express";
import product from './routes/productRoute.js';
import errorMiddleware from "./middleware/error.js";
import userRoute from  './routes/userRoutes.js'
const app = express();

app.use(express.json());

app.use("/api/v1",product);
app.use("/api/v1",userRoute);

// Middleware for Error
app.use(errorMiddleware);






export default app;
