import express from "express";
const router = express.Router();
import Room from "../models/Room.js";
import BookedRooms from "../models/BookedRooms.js";
import jwt from 'jsonwebtoken';
import TravelAgent from "../models/TravelAgent.js";
import User from "../models/User.js";
import { sendEmailToAgent, sendCancellationEmail } from "../utils/emailHelper.js";
import { verifyToken } from "../middlewares/verifyToken.js";
import { isBefore, isSameDay } from 'date-fns';

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

router.get('/all-booked-rooms', async (req, res) => {
    try {
        // Fetching all bookedrooms with status='booked'
        const bookedRooms = await BookedRooms.find({ status: 'booked' }).populate('travelAgent roomName');
        res.json(bookedRooms);
    } catch (err) {
        res.json({ message: 'Error fetching bookings' });
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

router.post('/booking', verifyToken, async (req, res) => {
    const { roomCategory, roomName, guestName, checkinDate, checkoutDate, travelAgentName } = req.body;
    const presentDate = new Date();
    const checkInDate = new Date(checkinDate);
    const checkOutDate = new Date(checkoutDate);
    const travelAgent = await TravelAgent.findOne({ personalName: travelAgentName });
    const roomId = await Room.findOne({ roomName });

    let userid = req.userid;

    // Input validation
    if (!roomCategory || !roomName || !guestName || !checkinDate || !checkoutDate || !travelAgentName) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    if (isBefore(checkInDate, presentDate) && !isSameDay(checkInDate, presentDate)) {
        return res.status(400).json({ message: 'Check-in date must be in the future' });
    }

    if(isBefore(checkOutDate, checkInDate)) {
        return res.status(400).json({ message: 'Check-out date must be after check-in date' });
    }

    try {
        const bookedRoom = await BookedRooms.create({
            roomCategory,
            roomName: roomId._id,
            guestName,
            checkinDate,
            checkoutDate,
            travelAgent: travelAgent._id,
            bookedBy: userid
        });
        // Populated travelAgent field
        const populatedBookedRoom = await bookedRoom
            .populate('travelAgent roomName');

    // Now fetch agent's email through name and send an email to the agent
    const user = await User.findById(bookedRoom.bookedBy).select('name');

    // Send email to agent
    sendEmailToAgent(travelAgent.emailAddress, populatedBookedRoom, user.name);

        return res.json({ message: 'Room booked successfully' });
    } catch (err) {
        console.error('Error while booking room:', err);
        return res.status(400).json({ message: "Error while booking room." });
    }

    
});

router.get('/bookedrooms', verifyToken, async (req, res) => {
    try {
      const userId = req.userid;
  
      // Fetch all booked rooms where bookedBy equals the logged-in user's ID
      const bookedRooms = await BookedRooms.find({ bookedBy: userId }).populate('travelAgent roomName');
  
      // Return the booked rooms to the client
      res.json(bookedRooms);
    } catch (error) {
      console.error('Error fetching booked rooms:', error);
      res.status(500).json({ message: 'Failed to fetch booked rooms.' });
    }
});

router.put('/bookedrooms/:bookingId/cancel', async (req, res) => {
    try {
        const bookingId = req.params.bookingId;
        const { cancellationReason } = req.body;
    
        const booking = await BookedRooms.findById(bookingId).populate('travelAgent roomName');
        const { emailAddress } = await TravelAgent.findOne({ _id: booking.travelAgent }).select('emailAddress');
    
        if (!booking) {
          return res.status(404).json({ message: 'Booking not found' });
        }
    
        // Update booking status to 'cancelled' and save the reason
        booking.status = 'cancelled';
        booking.cancellationReason = cancellationReason; // Add cancellation reason to the booking
        await booking.save();
    
        // Send an email notification to the travel agent
        sendCancellationEmail(emailAddress, booking, cancellationReason);
    
        res.status(200).json({ message: 'Booking cancelled successfully.' });
    } catch(err) {
        console.error('Error canceling booking:', err);
        res.status(500).json({ message: 'Failed to cancel booking.' });
    }
});

export default router;