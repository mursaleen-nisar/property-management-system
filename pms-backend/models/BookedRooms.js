import mongoose from 'mongoose';

const bookedRoomsSchema = new mongoose.Schema({
    roomCategory: {
        type: String,
        required: true
    },
    roomName: {
        type: String,
        required: true
    },
    guestName: {
        type: String,
        required: true
    },
    checkinDate: {
        type: String,
        required: true
    },
    checkoutDate: {
        type: String,
        required: true
    },
    travelAgent: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['booked', 'cancelled'],
        default: 'booked',
    },
    cancellationReason: {
        type: String
    },
    bookedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    }, { timestamps: true });
  
  const BookedRooms = mongoose.model('BookedRooms', bookedRoomsSchema);
  
  export default BookedRooms;