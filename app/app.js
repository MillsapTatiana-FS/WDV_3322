const express = require('express');
const userRoute = require('../api/routes/userRoute');
const app = express();
const options = require('../config/options');
const cors = require('cors');
const {mongoose } = require('mongoose');

require('dotenv').config();

app.use(express.json());
app.use(cors(options));

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.status(200).json({ message: "Service is Up"});
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

    mongoose.connect(process.env.mongoDBURL, (err) => {
        if (err) {
            console.error('Error', err.message);
        } else {
            console.log('MongoDB Connection successful');
        }
    });
module.exports = app;
