import express from "express";
const router = express.Router();
import { adminRegisterController, loginAuthController } from "../controllers/authController.js";

router.post('/admin/register', adminRegisterController);

router.post('/login', loginAuthController);

export default router;