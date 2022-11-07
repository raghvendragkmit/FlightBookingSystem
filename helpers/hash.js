const bcrypt = require('bcrypt');


const create_Hash = (password) => {
  return bcrypt.hashSync(password, 10);
}

const compare_Hash = (password, hashPassword) => {
  return bcrypt.compareSync(password, hashPassword);
}

module.exports = {
  create_Hash, compare_Hash
}
