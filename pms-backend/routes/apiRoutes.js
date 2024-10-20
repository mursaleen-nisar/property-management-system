import express from "express";
const router = express.Router();
import { adminRegisterController, loginAuthController, userRegisterController } from "../controllers/authController.js";
import jwt from 'jsonwebtoken';
import User from "../models/User.js";
import { verifyToken } from "../middlewares/verifyToken.js";

router.get('/user', verifyToken, async (req, res) => {
    try {
        let userid = req.userid;
        let loggedInUser = await User.findOne({ _id: userid });
        if (!loggedInUser) return res.status(401).json({ message: 'Unauthorized' });
        res.json({ role: loggedInUser.role });
    } catch (err) {
        res.status(401).json({ message: 'Unauthorized' });
    }
});

router.post('/admin/register', adminRegisterController);

router.post('/login', loginAuthController);

router.post('/register', userRegisterController);

router.get('/reports', async (req, res) => {});

export default router;