import express from "express";
import product from './routes/productRoute.js';
import error from "./middleware/error.js";
const app = express();

app.use(express.json());

app.use("/api/v1",product);

// Middleware for Error
app.use(error);


export default app;
