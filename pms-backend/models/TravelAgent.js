import mongoose from 'mongoose';

const travelAgentSchema = new mongoose.Schema({
    personalName: { type: String, required: true },
    agencyName: { type: String, required: true },
    phoneNumber: { type: Number, required: true },
    emailAddress: { type: String, required: true, unique: true },
    physicalAddress: { type: String, required: true }
}, { timestamps: true });

const TravelAgent = mongoose.model('TravelAgent', travelAgentSchema);

export default TravelAgent;