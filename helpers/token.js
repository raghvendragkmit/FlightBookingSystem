const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();

const createToken =  (data) => {
    const token =  jwt.sign(data, process.env.SECRET);
    return token;
};

const validateToken = (token) => {
    return jwt.verify(token, process.env.SECRET, (err, result) => {
        return err ? null : result;
    });
};

module.exports = { createToken, validateToken };
