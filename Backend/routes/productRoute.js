import { Router } from "express";
import productController from "../controllers/productController.js";
import auth from "../middleware/auth.js";

const router= Router();

router.route("/admin/products")
.get(auth.authorizedRoles,auth.authorizedRoles("admin"),productController.getAdminProducts)
router.route("/products")
.get(productController.getAllProducts)
router.route("/admin/product/new")
.post(auth.isAuthUser,auth.authorizedRoles("admin"),productController.createProduct)
router.route("/admin/product/:id")
.put(auth.isAuthUser,auth.authorizedRoles("admin"),productController.updateProduct)
.delete(auth.isAuthUser,auth.authorizedRoles("admin"),productController.deleteProduct);
router.route("/product/:id")
.get(productController.getSingleProduct);
router.route("/review")
.put(auth.isAuthUser,productController.createProductReview);
router.route("/reviews")
.get(productController.getProductReviews).delete(auth.isAuthUser,productController.deleteReview)

export default router;
