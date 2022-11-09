const db = require('../connection');
const { createHash, compareHash } = require('../helpers/hash');
const { createToken } = require("../helpers/token");


exports.createUser = (data, callback) => {
  db.query("SELECT * FROM Passengers WHERE email = ?", [data.email], (err, result) => {
    if (err) { return callback(err, null, 500); }
    else if (result.length >= 1) {
      return callback("email already exist", null, 409);
    }
    else {
      data.password = createHash(data.password);
      db.query("INSERT INTO Passengers(firstName,lastName,email,password) VALUES(?,?,?,?)", [data.firstName, data.lastName, data.email,
      data.password], (err, result1) => {
        if (err) {
          return callback(err, null, 500);
        }
        return callback(null, "Passenger registered successfully", 201);
      }
      )
    }
  })
}



exports.loginUser = (data, callback) => {
  db.query("SELECT * FROM Passengers WHERE email = ?", [data.email], (err, result) => {
    if (err) {
      return callback({ "error": err }, null, 500);
    }
    if (result.length == 0) {
      return callback({ "error": "User does not exist" }, null, 400);
    }
    let validate_password = compareHash(data.password, result[0].password);
    if (validate_password) {
      const token = createToken({ id: result[0].id, type: result[0].type });
      return callback(null, { "message": "Login successfully", token: token }, 200);
    } else {
      return callback({ "error": "wrong credentials" }, null, 400);
    }
  }
  );
}

