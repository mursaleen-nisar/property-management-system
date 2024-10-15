import mongoose from 'mongoose';

const roomSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  rate: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
}, { timestamps: true });

const Room = mongoose.model('Room', roomSchema);

export default Room;