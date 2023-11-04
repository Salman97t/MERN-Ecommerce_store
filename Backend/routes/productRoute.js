import { Router } from "express";
import productController from "../controllers/productController.js";

const Route= Router();

Route.route("/products").get(productController.getAllProducts)
Route.route("/product/new").post(productController.createProduct)
Route.route("/product/:id").put(productController.updateProduct)

export default Route;
