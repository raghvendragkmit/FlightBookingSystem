const db = require('../connection');



exports.get_All_Discount = (callback) => {

  db.query("SELECT * FROM Discounts", (err, result) => {
    if (err) {
      return callback({ error: err }, null, 503);
    }
    return callback(null, { "message": result }, 200)
  });

}





exports.create_Discount = (data,callback) => {
  db.query("INSERT into Discounts(offer) VALUES(?)", [data], (err, result) => {
    if (err) {
      return callback(err,null,503)
     }
    return callback(null, { "message": "discount created successfully" }, 201);
  });

}
