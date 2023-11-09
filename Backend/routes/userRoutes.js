import express from 'express';
import { Router } from "express";
import userController from "../controllers/userController.js"


const router= Router();

router.route("/register").post(userController.registerUser); 
router.route("/login").post(userController.loginUser)
router.route("/logout").get(userController.logout)
router.route("/password/forget").post(userController.forgetPassword);
router.route("/password/reset/:token").put(userController.restPassword);

export default router;

