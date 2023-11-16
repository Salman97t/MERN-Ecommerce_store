import express from "express";
import product from './routes/productRoute.js';
import errorMiddleware from "./middleware/error.js";
import user from  './routes/userRoutes.js'
import cookieParser from "cookie-parser";
import order from "./routes/orderRoute.js"
import bodyParser from "body-parser";
import fileUpload from "express-fileupload";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended:true}))
app.use(fileUpload());

app.use("/api/v1",product);
app.use("/api/v1",user);
app.use("/api/v1",order);

// Middleware for Error
app.use(errorMiddleware);






export default app;
