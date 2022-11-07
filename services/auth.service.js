const db = require('../connection');
const { create_Hash, compare_Hash } = require('../helpers/hash');
const { create_Token } = require("../helpers/token");


exports.create_Passenger = (data, callback) => {
  console.log(data.email);
  db.query("SELECT * FROM Passengers WHERE email = ?", [data.email], (err, result) => {
    if (err) { return callback(err, null, 500); }
    else if (result.length >= 1) {
      return callback("email already exist", null, 409);
    }
    else {
      data.password = create_Hash(data.password);
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



exports.login_Passenger = (data, callback) => {
  db.query("SELECT * FROM Passengers WHERE email = ?", [data.email], (err, result) => {
    if (err) {
      return callback({ "error": err }, null, 500);
    }
    if (result.length == 0) {
      return callback({ "error": "User does not exist" }, null, 400);
    }
    let validate_password = compare_Hash(data.password, result[0].password);
    if (validate_password) {
      const token = create_Token({ id: result[0].id, type: result[0].type });
      return callback(null, { "message": "Login successfully", token: token }, 200);
    } else {
      return callback({ "error": "wrong credentials" }, null, 400);
    }
  }
  );
}

