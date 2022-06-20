var jwt = require('jsonwebtoken');
require('dotenv').config();

const checkAuth = (req, res, next) => {
    try {
        const [bearer, token] = req.headers.authorization.split(' ');
        const payload = jwt.verify(token, process.env.key);
        req.userData =
    } catch (error) {
        res.status(401).json({ message: 'Authorization Failed' });
    }
};

module.exports = checkAuth;