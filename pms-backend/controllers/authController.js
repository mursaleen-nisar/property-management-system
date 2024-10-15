import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const adminRegisterController = async (req, res) => {
    const { name, email, password } = req.body;

    const user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: 'User already exists' });

    bcrypt.genSalt(10, (err, salt) => {
        if (err) console.error("Error generating salt");
        bcrypt.hash(password, salt, async (err, hash) => {
            if (err) console.error("Error hashing password");
            await User.create({
                name,
                email,
                password: hash,
                role: 'admin'
            });
        });
    });

    res.json({ message: 'Registered successfully' });
}

export const loginAuthController = async (req, res) => {
    const { email, password } = req.body;

    let user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'User not found' });

    // now check for password
    let isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid email or password' });

    // if password matches, create and return JWT token
    let token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.cookie('token', token);

    res.json({ message: 'Logged in successfully' });
}