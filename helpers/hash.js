const bcrypt = require('bcrypt');


const createHash = (password) => {
  return bcrypt.hashSync(password, 10);
}

const compareHash = (password, hashPassword) => {
  return bcrypt.compareSync(password, hashPassword);
}

module.exports = {
  createHash, compareHash
}
