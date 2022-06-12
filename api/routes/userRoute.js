const express = require('express');
const user = require('../model/user');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

router.use(express.json());

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: '/profile - GET',
    });
});

router.post(':/signup', (req, res, next) => {
    user.find({ 
        _id: req.body.email
     })
    .exec()
    .then(result => {
        if (result.length > 0){
            return res.status(409).json({
                message: 'Email found, user exists'
            })
        } else {
    // findUser by email address findOne{email: _id}
    // if user exist return status 409 message: email/user exist otherwise encryp password
    //create new user object with hash password as password
    //save user
        const password = req.body.password;
        const newUser = new user({
            _id: mongoose.Types.ObjectId(),
            firstName: req.body.firstName,
            email: req.body.email,
            password: req.body.hash,
        });
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

router.get('/login', (req,res, next) => {
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
        res.status(200).json({
            message: '/login - POST',
        });
    })
    //find user
    //if not found return 401 message:vAuth failed
    //else
    //compare password and test for error
    //test result(like previous video)
    //message auth successful
    })});
}})});

module.exports = router;