import express from 'express';
import { Router } from "express";
import userController from "../controllers/userController.js"


const router= Router();

router.route("/register").post(userController.registerUser);

export default router;

