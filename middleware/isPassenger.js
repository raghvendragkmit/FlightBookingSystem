const dotenv = require("dotenv");
dotenv.config();
const db = require("../connection");
exports.isPassenger = (req, res, next) => {
  let id = req.id;
  let type = req.type;
  if (type == "passenger") return next();
  else return res.status(401).json({ error: "login required" });
};
