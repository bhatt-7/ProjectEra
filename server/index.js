// index.js

require('dotenv').config(); // Load environment variables from .env file
const express = require('express');
const { connectDB } = require('./config/database');
const userRoutes = require('./routes/userRoutes');
const cookieParser = require("cookie-parser");
const app = express();
const cors = require('cors');

const helmet= require('helmet')
const morgan = require('morgan')

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
        origin:"http://localhost:3000",
        credentials:true
    })
)

app.use(helmet())
app.use(morgan("common"))

// Routes
app.use('/api/users', userRoutes); // Mount the user routes under /api/users

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});