import { Router } from "express";
import auth from "../middleware/auth.js";
import orderController from "../controllers/orderController.js";

const router= Router();

router.route("/order/new").post(auth.isAuthUser,orderController.newOrder)
router.route("/order/:id").get(auth.isAuthUser,orderController.getSingleOrder);
router.route("/orders/me").get(auth.isAuthUser,orderController.myOrders);
router.route("/admin/orders").get(auth.isAuthUser,auth.authorizedRoles("admin"),orderController.getAllOrders);
router.route("/admin/order/:id")
.put(auth.isAuthUser,auth.authorizedRoles("admin"),orderController.updateOrder)
.delete(auth.isAuthUser,auth.authorizedRoles("admin"),orderController.deleteOrder);

export default router;