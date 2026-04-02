const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const authRoutes = require('./routes/authRoutes');
const eventRoutes = require('./routes/eventRoutes');
const userRoutes = require('./routes/userRoutes');
const vendorRoutes = require('./routes/vendorRoutes');
const profileRoutes = require('./routes/profileRoutes');
const aiRoutes = require("./routes/aiRoutes");


const connectDB = require('./config/db');
connectDB();
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth' , authRoutes);
app.use('/api/event' , eventRoutes);
app.use('/api/user' , userRoutes);
app.use('/api/vendor' , vendorRoutes);
app.use("/api/profile", profileRoutes)
app.use("/api/ai", aiRoutes);

module.exports = app;  
