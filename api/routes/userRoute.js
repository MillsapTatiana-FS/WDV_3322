const express = require('express');
const User = require('../model/user');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const checkAuth = require('../auth/checkAuth');
require('dotenv').config();
const { findUser, saveUser } = require('../../db/db');

/**
 * @swagger
 * tags:
 *  name: User Signup
 *  description: This is for the user signup
 * /signup:
 *  post: 
 *          tags: [user signup]
 *          requestBody:
 *                  required: true
 *                  content:
 *                     application/json:
 *                              schema:
 *                                  type: object
 *                                  properties:
 *                                          name: firstname
 *                                               type:string
 *                                              default:Why me
 *                                          post:
 *                                                  type: string
 *                                                  default: Because
 *              responses:
 *                  default:
 *                          description: Success
 */
router.use(express.json());

router.get('/profile', checkAuth , (req,res, next) => {
    res.status(200).json({ message: req.userData });
});

router.post('/signup', (req, res,next) => {
//{email: req.body.email}
//look for a user object in Mongo
//if user email exist
//if not found encrypt password
//made user model and save to mongodb
findUser(req.body.email)
.then((result) => {
    if (result) {
        return res.status(409).json({
            message: "User Already Created"
        })
    } else {
        const password = req.body.password;
         bcrypt.hash(password, 10, (err, hash) => {
            if (err) {
                res.status(500).json({ message: err.message });
            } else {
                const user = new User({
                    _id: mongoose.Types.ObjectId(),
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    address: req.body.address,
                    city: req.body.city,
                    state: req.body.state,
                    zipcode: req.body.zipcode,
                    email: req.body.email,
                    password: hash,
                });
            //save to db
            saveUser(user)
            .then((result) => {
                res.status(201).json({
                    message: 'User Created',
                    result: result,
                    });
                })
            .catch(err => {
                console.error(err.message)
                res.status(500).json({
                    error: {message: err.mesage}
                });
            });
    }
    })
}
}).catch((err) => {
    console.log(err);
    res.status(500).json({
        error: { message: "User not created"}
    });
});

router.post('/login', (req, res) => {
    //  findUser by email address findOne{email: _id}
    // if not found return Auth Failed
    // else
    // user returned with user info and a HASHED PW
    
    findUser(req.body.email)
    .then((user) => {
        console.log(user);   
        bcrypt.compare(req.body.password, user.password, (err, result) => {
            if(err)return res.status(501).json({message: err.message });
            if(result){
                const email = req.body.email;
                const password = result.password;
                const name = user.firstName;
                const token = jwt.sign(
                    { 
                       email: email,
                       name: name, 
                       password: password 
                    }, 
                    process.env.key
                );

                res.status(201).json({
                    message: 'Authorization Successful',
                    token: token,
                    name: name,
                });
            } else {
                res.status(401).json({
                    message: 'Authorization Failed',
                });
            }
        });
    });
});
})

module.exports = router;