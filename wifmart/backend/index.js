const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const http = require('http'); // Import HTTP module
const { Server } = require('socket.io'); // Import Socket.io
require('dotenv').config();
const mongoose = require('mongoose');
const router = require('./routes');

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Connected to DB'))
    .catch(err => {
        console.error('MongoDB connection error:', err);
        process.exit(1); // Exit if unable to connect
    });

const app = express();

// Middleware
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());
app.use("/api", router);

// Create HTTP server for WebSocket integration
const server = http.createServer(app);

// Initialize Socket.io server
const io = new Server(server, {
    cors: {
        origin: process.env.FRONTEND_URL, // Your frontend URL
        credentials: true,
    }
});

// Handle WebSocket connections
io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    // Example: Listen for a notification event
    socket.on('send-notification', (data) => {
        console.log('Notification received:', data);

        // Broadcast the notification to all connected clients
        io.emit('new-notification', data);
    });

    // Handle disconnection
    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });
});

// Start the server
const PORT = process.env.PORT || 8080;

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
