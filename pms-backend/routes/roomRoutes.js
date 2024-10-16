import express from "express";
const router = express.Router();
import Room from "../models/Room.js";

router.post('/add', async (req, res) => {
    const { roomName, roomRate, roomCategory } = req.body;

    // Input validation
    if (!roomName || !roomRate || !roomCategory) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        // Save the room to the database
        await Room.create({ roomName, roomRate, roomCategory });

        // Send success response
        return res.json({ message: 'Room added successfully' });
    } catch (error) {
        return res.status(400).json({ message: 'Error adding room' });
    }
});

export default router;