const express = require('express');
const user = require('../model/user');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

router.use(express.json());

router.post('signup', (req, res,next) => {
//{email: req.body.email}
//look for a user object in Mongo
//if user email exist
//if not found encrypt password
//made user model and save to mongodb
user.findOne({email: req.body.email})
const password = req.user.password;
    bcrypt.hash(password, 10, (err, hash) => {
        if (err) {
            res.status(500).json({ message: err.message });
        } else {
            const user = new user({
                _id: mongoose.Types.ObjectId(),
                firstName: req.body.firstName,
                email: req.body.email,
                password: hash,
            });
            //save to db
            res.status(201).json({
                message: 'Signup - POST',
                user: user
                });
        }
    })});

router.post('login', (req, res, next) => {
    //  findUser by email address findOne{email: _id}
    // if not found return Auth Failed
    // else
    // user returned with user info and a HASHED PW
    user.findOne({_id: email})
    .then(   
        bcrypt.compare(req.body.password, user.body.hash, (err, result) => {
            if(err)return res.status(501).json({message: err.message })
            if(result){
                res.status(200).json({
                message: 'Login - POST,  Authorization Successful',
                result: result,
                name: req.body.firstName
                })
            }
            else {
                res.status(409).json({
                    message: 'Authorization Failed',
                });
            }
        }));
});

router.get('/profile', (req,res, next) => {

    user.findOne({_id: email})
    .populate("user","email")
    .then (result => {
        if(err)return res.status(501).json({message: 'Authorization Failed' })
        if(result){
            res.status(200).json({
            message: '/profile - GET',
            });
        };
})});

module.exports = router;