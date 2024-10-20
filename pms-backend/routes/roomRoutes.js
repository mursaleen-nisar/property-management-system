import express from "express";
const router = express.Router();
import Room from "../models/Room.js";
import BookedRooms from "../models/BookedRooms.js";
import jwt from 'jsonwebtoken';
import TravelAgent from "../models/TravelAgent.js";
import User from "../models/User.js";
import { sendEmailToAgent } from "../utils/emailHelper.js";

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

router.post('/booking', async (req, res) => {
    const { roomCategory, roomName, guestName, checkinDate, checkoutDate, travelAgent } = req.body;
    const presentDate = new Date();
    const checkInDate = new Date(checkinDate);
    const checkOutDate = new Date(checkoutDate);

    let decodedToken = jwt.verify(req.cookies.token, process.env.JWT_SECRET);

    // Input validation
    if (!roomCategory || !roomName || !guestName || !checkinDate || !checkoutDate || !travelAgent) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    if (checkInDate < presentDate) {
        return res.status(400).json({ message: 'Check-in date must be in the future' });
    }

    if(checkOutDate < checkInDate) {
        return res.status(400).json({ message: 'Check-out date must be after check-in date' });
    }

    try {
        const bookedRoom = await BookedRooms.create({
            roomCategory,
            roomName,
            guestName,
            checkinDate,
            checkoutDate,
            travelAgent,
            bookedBy: decodedToken.id
        });

    // Now fetch agent's email through name and send an email to the agent
    const agent = await TravelAgent.findOne({ personalName: travelAgent });
    const user = await User.findById(bookedRoom.bookedBy).select('name');

    // Send email to agent
    sendEmailToAgent(agent.emailAddress, bookedRoom, user.name);

        return res.json({ message: 'Room booked successfully' });
    } catch (err) {
        return res.status(400).json({ message: "Error while booking room." });
    }

    
});

export default router;