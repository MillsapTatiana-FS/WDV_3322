//Bring in user model
const user = require('../api/model/user');

const connect = async () => {
    console.log('Mock Connection');
};

const postUser = async(user) => {
    console.log('Mock User');
    return Promise.resolve({
        firstName: 'Tatiana',
        email: 'tmmillsap@student.fullsail.edu',
        password: 'Apollo',
    });
};

const findUser = async (user) => {
    await userInfo.findOne({ 
        email: req.body.email,
     })
     .exec();
};

const saveUser = async (user) => {
    console.log('Real User');
   return await user.save();
};

const disconnect = async () => {
    console.log('Disconnecting');
   await mongoose.connection.close();
};


module.exports = { connect, findUser, postUser, saveUser,  disconnect };