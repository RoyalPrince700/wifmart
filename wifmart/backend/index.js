// filepath: /c:/Users/HP/Desktop/com/wifmart/backend/index.js
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
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

// Configure CORS
app.use(cors({
    origin: [process.env.FRONTEND_URL, 'https://wifmart.vercel.app'], // Add your frontend URLs
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true
}));
app.options('*', cors());

// Middleware to parse JSON and cookies
app.use(express.json());
app.use(cookieParser());

// Add a Root Route for Testing
app.get('/', (req, res) => {
    res.send('Welcome to the Wifmart Backend! The server is running.');
});

// API Routes
app.use("/api", router);

// Start the Server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log("Server is running on port", PORT);
});