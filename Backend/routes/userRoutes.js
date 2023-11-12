import express from 'express';
import { Router } from "express";
import userController from "../controllers/userController.js"
import auth from "../middleware/auth.js"


const router= Router();

router.route("/register").post(userController.registerUser); 
router.route("/login").post(userController.loginUser)
router.route("/logout").get(userController.logout)
router.route("/password/forget").post(userController.forgetPassword);
router.route("/password/reset/:token").put(userController.restPassword);
router.route("/profile").get(auth.isAuthUser,userController.getUserDetails);
router.route("/password/update").put(auth.isAuthUser,userController.updatePassword);
router.route("/profile/update").put(auth.isAuthUser,userController.updateProfile);
router.route("/admin/users").get(auth.isAuthUser,auth.authorizedRoles("admin"),userController.getRegisteredUser);
router.route("/admin/user/:id")
.get(auth.isAuthUser,auth.authorizedRoles("admin"),userController.getSingleUser)
.put(auth.isAuthUser,auth.authorizedRoles("admin"),userController.updateUserRole)
.delete(auth.isAuthUser,auth.authorizedRoles("admin"),userController.deleteUser);



export default router;

