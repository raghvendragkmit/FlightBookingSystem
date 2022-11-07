const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();

const create_Token = (data) => {
  const token = jwt.sign(data, process.env.SECRET);
  return token;
};

const validate_Token = (token) => {
  return jwt.verify(token, process.env.SECRET, (err, result) => {
    if (err) {
      return null;
    }
    return result;
  })
}

module.exports = { create_Token, validate_Token }
