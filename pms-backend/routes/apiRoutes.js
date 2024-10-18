import express from "express";
const router = express.Router();
import { adminRegisterController, loginAuthController, userRegisterController } from "../controllers/authController.js";
import jwt from 'jsonwebtoken';
import User from "../models/User.js";

router.get('/user', async (req, res) => {
    try {
        let decoded = jwt.verify(req.cookies.token, process.env.JWT_SECRET);
        let loggedInUser = await User.findOne({ _id: decoded.id });
        if (!loggedInUser) return res.status(401).json({ message: 'Unauthorized' });
        res.json({ role: loggedInUser.role });
    } catch (err) {
        res.status(401).json({ message: 'Unauthorized' });
    }
});

router.post('/admin/register', adminRegisterController);

router.post('/login', loginAuthController);

router.post('/register', userRegisterController);

export default router;