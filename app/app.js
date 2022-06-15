const express = require('express');
const userRoute = require('../api/routes/userRoute');
const app = express();
const options = require('../config/options');
const cors = require('cors');

require("dotenv").config();

app.use(express.json());
app.use(cors(options));

app.use(express.urlencoded({ extended: true }));

app.use('/userRoute', userRoute);
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

module.exports = app;
