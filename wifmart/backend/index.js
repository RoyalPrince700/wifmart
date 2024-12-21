const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser')
require('dotenv').config();
const mongoose = require('mongoose');
const router = require('./routes');


// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Connected to DB'))
    .catch(err => {
        console.error('MongoDB connection error:', err);
        process.exit(1);  // Exit if unable to connect
    });

const app = express();
app.use(cors({
    origin : process.env.FRONTEND_URL,
    credentials : true
}));
app.use(express.json());  // Middleware to parse JSON bodies
app.use(cookieParser())

app.use("/api", router);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log("Server is running on port", PORT);
});
