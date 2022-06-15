const express = require('express');
const user = require('../model/user');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

router.use(express.json());

router.post('/signup', (req,res) => {
//{email: req.body.email}
//look for a user object in Mongo
//if not found encrypt password
//made user model and save to mongodb
    const password = req.body.password;
    bcrypt.hash(password, 10, (err, hash) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            const user = new user({
                _id: mongoose.Types.ObjectId(),
                firstName: req.body.firstName,
                email: req.body.email,
                password: hash,
            });
            //save to db
            res.status(201).json({
                message: 'User Created',
                firstName: req.body.firstName,
                });
        }})});

router.post('/login', (req, res) => {
        const email = req.body.email;
        const firstName = req.body.firstName;
        const lastName = req.body.lastName;
    //  findUser by email address findOne{email: _id}
    // if not found return Auth Failed
    // else
    // compare passwords using bcrypt get error or result of true or false
    // if error return err.message
    // else return response
        
        bcrypt.hash(password, 10, (err, hash) => {
            if (err) {
                res.status(500).json({
                    message: err.message,
                });
            } else {
                newUser.save()
                    .then(result => {
                        res.status(201).json({
                        message: 'Signup - POST',
                        user: {
                            firstName: req.body.firstName,
                            email: req.body.email,
                            password: hash, 
                        }
                    })})
                    .catch(err => {
                        res.status(500).json({
                            error: {
                                message: 'User not saved'
                            }
                    })});
};

router.get('/profile', (req,res) => {
   const userEmail = req.params.email;
   
   user.findById({
       _id: userEmail
   })
   .then(result => {
       if (!email) {
           return res.status(401).json({
               message: 'No email found'
           })
       } else {
        bcrypt.compare(req.body.password, req.body.hash, (err, result) => {
             if(err)return res.status(409).json({
                message: 'Authorization Failed'
                })
             else {
                return res.status(200).json({
                    message: 'Login - POST, Authorization Successful'
                })
            }
        })}})
    .catch(err => {
         res.status(500).json({
            error: {
                message: 'Error occurred'
            }
        });
    })
   
})})});

module.exports = router;