const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();

const createToken = (data) => {
  const token = jwt.sign(data, process.env.SECRET);
  return token;
};

const validateToken = (token) => {
  return jwt.verify(token, process.env.SECRET, (err, result) => {
    if (err) {
      return null;
    }
    return result;
  })
}

module.exports = { createToken, validateToken }
