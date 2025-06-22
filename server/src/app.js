const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const eventRoutes = require('./routes/eventRoutes');
const connectDB = require('./config/db');
connectDB();
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth' , authRoutes);
app.use('/api/event' , eventRoutes);

module.exports = app;  
