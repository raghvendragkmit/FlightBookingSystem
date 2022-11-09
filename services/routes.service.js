const db = require("../connection");

exports.createRoute = (data, callback) => {
  try {
    db.query(
      "SELECT * FROM Routes WHERE source=? AND destination=?",
      [data.source, data.destination],
      (err, result) => {
        if (err) {
          return callback({ error: err }, null, 503);
        } else if (result.length >= 1) {
          return callback(null, { message: "Routes already exists" }, 409);
        } else {
          db.query(
            "INSERT INTO Routes(source,destination) VALUES(?,?)",
            [data.source, data.destination],
            (err, result) => {
              if (err) return callback({ error: err }, null, 503);
              return callback(
                null,
                { message: "Routes created successfully" },
                201
              );
            }
          );
        }
      }
    );
  } catch (err) {
    callback({ error: err }, null, 503);
  }
};

exports.getAllRoute = (callback) => {
  db.query("SELECT * FROM Routes", (err, result) => {
    if (err) {
      return callback({ error: err }, null, 503);
    }
    return callback(null, { result: result }, 200);
  });
};

exports.deleteRoute = (data, callback) => {
  db.query("DELETE FROM Routes WHERE id = ?", [data.id], (err, result) => {
    if (err) {
      return callback({ error: err }, null, 503);
    }

    if (result.length == 0)
      return callback({ error: "Routes does not exist" }, null, 400);

    return callback(null, { result: "Route deleted successfully" }, 200);
  });
};
