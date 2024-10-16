import express from "express";
const router = express.Router();
import Room from "../models/Room.js";

router.get('/', async (req, res) => {
    try {
        // Fetch all rooms from the database
        const rooms = await Room.find({});
        res.json(rooms);
    } catch (err) {
        console.error(err);
        res.status(400).json({ message: 'Error fetching rooms' });
    }
});

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