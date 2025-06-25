const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const eventRoutes = require('./routes/eventRoutes');
const vendorRoutes = require('./routes/vendorRoutes');
const connectDB = require('./config/db');
connectDB();
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth' , authRoutes);
app.use('/api/event' , eventRoutes);
app.use('/api/vendor' , vendorRoutes);

module.exports = app;  
