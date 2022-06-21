const express = require('express');
const User = require('../model/user');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const checkAuth = require('../auth/checkAuth');
require('dotenv').config();

router.use(express.json());

router.post('/signup', (req, res,next) => {
//{email: req.body.email}
//look for a user object in Mongo
//if user email exist
//if not found encrypt password
//made user model and save to mongodb
User.findOne({email: req.body.email});
const password = req.user.password;
    bcrypt.hash(password, 10, (err, hash) => {
        if (err) {
            res.status(500).json({ message: err.message });
        } else {
            const user = new User({
                _id: mongoose.Types.ObjectId(),
                firstName: req.body.firstName,
                email: req.body.email,
                password: hash,
            });
            //save to db
            user
            .save()
            .then((result) => {
                res.status(201).json({
                    message: 'User Created',
                    result: result,
                    });
        })
            .catch((err) => console.log(err.message));
        }
    });
});

router.post('/login', (req, res) => {
    //  findUser by email address findOne{email: _id}
    // if not found return Auth Failed
    // else
    // user returned with user info and a HASHED PW
    const email = req.body.email;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;

    User.findOne({email: req.body.email}).then((user) => {
        console.log(user);   
        bcrypt.compare(req.body.password, user.password, (err, result) => {
            if(err)return res.status(501).json({message: err.message });
            if(result){
                const token = jwt.sign(
                    { email: email, firstName: firstName, lastName: lastName }, process.env.key
                );

                res.status(201).json({
                    message: 'Authorization Successful',
                    token: token,
                    name: firstName,
                });
            } else {
                res.status(401).json({
                    message: 'Authorization Failed',
                });
            }
        });
    });
});

router.get('/profile', checkAuth , (req,res, next) => {
    res.status(200).json({ message: req.userData });
});

module.exports = router;