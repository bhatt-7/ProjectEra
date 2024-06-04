// middlewares/validateOTP.js
const OTPVerification = require('../models/OTPVerification');
const jwt = require('jsonwebtoken');

exports.auth = async (req, res, next) => {
    try {
        // Extract token
        const token = req.cookies.token || req.body.token || req.header('Authorization').replace('Bearer ', '');
        console.log(token);
        // If token is missing, return response
        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'Token is missing',
            });
        }

        // Verify the token
        try {
            const decode = jwt.verify(token, process.env.JWT_SECRET);
            console.log(decode);
            req.user = decode; // Attach decoded user information to req.user
            next(); // Proceed to the next middleware
        } catch (err) {
            // Token verification issue
            return res.status(401).json({
                success: false,
                message: 'Token is invalid',
            });
        }
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: 'Something went wrong while validating the token',
        });
    }
};
