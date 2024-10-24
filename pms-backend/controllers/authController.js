import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const adminRegisterController = async (req, res) => {
    const { name, email, password } = req.body;

    const admins = await User.find({ role: 'admin' });
    if(admins.length > 0) {
        return res.status(403).json({ message: "You are not allowed to register"});
    }

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

    res.json({ token, message: 'Logged in successfully' });
}

export const userRegisterController = async (req, res) => {
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
                password: hash
            });
        });
    });

    res.json({ message: 'Registered successfully' });
}