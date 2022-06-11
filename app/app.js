const express = require('express');
const userRoute = require('../api/routes/userRoute');
const app = express();
const options = require('../config/options');
const mongoose = require('mongoose');
const cors = require('cors');
const user = require('../api/model/user');

require("dotenv").config();

app.use(express.json());
app.use(cors(options));

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

app.get('/users/:email_id', (req, res, next) => {
    const email_id = req.params.email_id;
})
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

    app.post('/signup', (req, res) => {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
            if (err) {
                res.status(500).json({ message: err.message });
            } else {
                user.password = hash;
                res.status(200).json({ password: hash});
            }
        });
    });

    app.post('/login', (req, res) => {
        bcrypt.compare(req.body.password, user.password, (err, result) => {
            if (err) return res.status(501).json({
                message: err.message
            });
            if (result){
                res.status(200).json({
                    message: "Authoriztion Successful",
                    result: result,
                });
            } else {
                    res.status(401).json({
                        message: "Authoriztion Failed",
                        result: result,
                });
            }
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
