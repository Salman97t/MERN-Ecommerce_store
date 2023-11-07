import { Router } from "express";
import productController from "../controllers/productController.js";
import isAuthUser from "../middleware/auth.js";

const router= Router();

router.route("/products").get(productController.getAllProducts)
router.route("/product/new").post(isAuthUser,productController.createProduct)
router
.route("/product/:id")
.put(isAuthUser,productController.updateProduct)
.delete(isAuthUser,productController.deleteProduct)
.get(productController.getSingleProduct)

export default router;
