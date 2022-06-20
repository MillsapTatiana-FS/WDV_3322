const jwt = require('jsonwebtoken');
require('dotenv').config();

const auth = (req, res, next) => {
    try {

    } catch (error) {
        res.status(401).json({ message: 'Authorization Failed' });
    }
};

module.exports = auth;