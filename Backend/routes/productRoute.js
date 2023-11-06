import { Router } from "express";
import productController from "../controllers/productController.js";

const router= Router();

router.route("/products").get(productController.getAllProducts)
router.route("/product/new").post(productController.createProduct)
router.route("/product/:id").put(productController.updateProduct).delete(productController.deleteProduct).get(productController.getSingleProduct)

export default router;
