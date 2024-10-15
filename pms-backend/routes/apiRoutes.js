import express from "express";
const router = express.Router();

router.post('/admin/register', (req, res) => {
    const { name, email, password } = req.body;

    console.log(name, email, password);
    
    // Save user to the database

    res.json({ message: 'User registered successfully' });
});

export default router;