const express = require('express');
const user = require('../model/user');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { findUser } = require('../../db/db');

router.use(express.json());

router.get('/profile', (req, res, next) => {
    res.status(200).json({
        message: '/profile - GET',
    });
});

router.post('/signup', (req, res, next) => {
   
    user.find({ 
        _id: email
     })
     .exec()
    .then(result => {
        if (result.length > 0) {
            return res.status(406).json({
                message: 'Email not found'
            })
        }
    // findUser by email address findOne{email: _id}
    // if user exist return status 409 message: email/user exist otherwise encryp password
    //create new user object with hash password as password
    //save user
    const password = req.body.password;
    bcrypt.hash(password, 10, (err, hash) => {
        if (err) {
            res.status(500).json({
                message: err.message,
            });
        } else {
            const User = new user({
                _id: mongoose.Types.ObjectId(),
                firstName: req.body.firstName,
                email: req.body.email,
                password: hash,
            });
            newUser.save();

            res.status(201).json({
                message: 'Signup - POST',
                user: User,
            });
        }
    });
})});

router.post('/login', (req,res, next) => {
    //find user
    //if not found return 401 message:vAuth failed
    //else
    //compare password and test for error
    //test result(like previous video)
    //message auth successful
    res.status(200).json({
        message: '/login - POST',
    });
    bcrypt.compare(req.body.password, req.body.hash, (err, result) => {
        if(err)return res.status(501).json({message: err.message})
        if(result){
            res.status(200).json({
                message: 'Login - POST, Authorization Successful',
                result: result,
                name: req.body.firstName
            })
        }
        else{
            res.status(409).json({
                message: 'Authorization Failed',
            });
        }
    });
});





module.exports = router;