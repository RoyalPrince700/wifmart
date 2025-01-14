// filepath: /c:/Users/HP/Desktop/com/wifmart/backend/config/socket.js
const { Server } = require('socket.io');

const initializeSocket = (server) => {
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

    return io;
};

module.exports = initializeSocket;