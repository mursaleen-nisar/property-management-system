import express from "express";
const router = express.Router();
import TravelAgent from "../models/TravelAgent.js";

router.post('/add', async (req, res) => {
    const { personalName, agencyName, phoneNumber, emailAddress, physicalAddress } = req.body;

    // Input validation
    if (!personalName || !agencyName || !phoneNumber || !emailAddress || !physicalAddress) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        // Check if the email is already registered
        const existingAgent = await TravelAgent.findOne({ emailAddress });
        if (existingAgent) {
            return res.status(400).json({ message: 'Agent with this email already exists' });
        }

        // Save the travel agent to the database
        await TravelAgent.create({
            personalName,
            agencyName,
            phoneNumber,
            emailAddress,
            physicalAddress
        });

        // Send success response
        return res.status(201).json({ message: 'Travel agent added successfully' });
    } catch (error) {
        return res.status(500).json({ message: 'Error adding travel agent' });
    }
});

export default router;