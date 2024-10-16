import mongoose from 'mongoose';

const roomSchema = new mongoose.Schema({
  roomName: {
    type: String,
    required: true,
  },
  roomRate: {
    type: Number,
    required: true,
  },
  roomCategory: {
    type: String,
    required: true,
  },
}, { timestamps: true });

const Room = mongoose.model('Room', roomSchema);

export default Room;