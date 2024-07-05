const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');


dotenv.config();

// Importing routers and middleware
const admin = require('./adminRoutes/userRoutes');
const middleware  = require('./adminMiddleware/jwtTokenMiddleware');

// Initialize express app
const app = express();

// Use CORS middleware
app.use(cors());

// Use bodyParser middleware
app.use(bodyParser.json());

// Define parent routers
app.use('/admin', admin);
app.use(middleware);

// MongoDB connection
const dbURI = 'mongodb+srv://Fundnest:8877446687@fundnest.lris2bh.mongodb.net/'; // MongoDB remote

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB Server');
    })
    .catch(error => {
        console.error('Error connecting to MongoDB:', error.message);
    });

// Start the server
const PORT = 4000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on port ${PORT}`);
});
