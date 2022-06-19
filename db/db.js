const mongoose = require("mongoose");
//Bring in user model
const User = require('../api/model/user');

const connect = async () => {
    console.log('Connecting');
    await mongoose.connect('mongodb://localhost:27017/users/')
};

const postUser = async(User) => {
    console.log('Real User');
    return await User.save();
};

const findUser = async (User) => {
    await userInfo.findOne({ 
        email: req.body.email,
     })
     .exec(User);
};

const saveUser = async (User) => {
    console.log('Real User');
   return await User.save();
};

const disconnect = async () => {
    console.log('Disconnecting');
   await mongoose.connection.close();
};


module.exports = { connect, findUser, postUser, saveUser,  disconnect };