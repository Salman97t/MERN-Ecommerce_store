import { Router } from "express";
import getAllProducts from "../controllers/productController.js";

const Route= Router();

Route.route("/products").get(getAllProducts)

export default Route;
