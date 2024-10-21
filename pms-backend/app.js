import express from 'express';
import dotenv from 'dotenv/config';
import cors from 'cors';
import connectDB from './config/db.js';
import cookieParser from 'cookie-parser';

connectDB();

// Import routes
import indexRoutes from './routes/index.js';
import apiRoutes from './routes/apiRoutes.js';
import roomRoutes from './routes/roomRoutes.js';
import agentRoutes from './routes/agentRoutes.js';

// Initialize express app
const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: `${process.env.FRONTEND_BASE_URL}`,
    credentials: true,
}));

// Routes
app.use('/', indexRoutes);
app.use('/api', apiRoutes);
app.use('/rooms', roomRoutes);
app.use('/agents', agentRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});