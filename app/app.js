const express = require('express');
const userRoute = require('../api/routes/userRoute');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();

app.use(express.json());

app.use(
    express.urlencoded({ 
        extended: true,
     })
);

app.use((req, res, next) => {
    res.header( 'Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization' );

    if (req.method === 'OPTIONS') {
        res.header ('Access-Control-Allow-Methods', 'POST, PUT, PATCH, GET, DELETE');
    }
    next();
});

app.get('/', (req,res,next) => {
    res.status(200).json({
        message: 'Server is up',
        method: req.method,
    });
});

app.use('/users', userRoute);
// add middleware to handle errors and bad url paths
app.use((req, res, next) => {
    const error = new Error ('NOT FOUND!!! ');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res. status(error.status || 500). json({
        error: {
                message: error.message,
                status: error.status,
            },
        });
    });
//connect to mongoDB
mongoose.connect(process.env.mongoDBURL, (err) => {
    if (err) {
        console.error('Error:', err.message);
    } else {
        console.log('MongoDB connection successful');
    }
});

module.exports = app;
