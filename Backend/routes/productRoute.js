import { Router } from "express";
import productController from "../controllers/productController.js";

const Route= Router();

Route.route("/products").get(productController.getAllProducts)
Route.route("/products/new").post(productController.createProduct)

export default Route;
