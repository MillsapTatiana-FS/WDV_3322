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

const disconnect = async () => {
    console.log('Mock Disconnect');
};


module.exports = { connect, postUser,  disconnect };