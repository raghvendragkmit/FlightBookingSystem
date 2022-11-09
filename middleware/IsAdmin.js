const dotenv = require("dotenv");
dotenv.config();
const db = require("../connection");
exports.isAdmin = (req, res, next) => {
  const id = req.id;
  const type = req.type;
  if (type == "admin") return next();
  else return res.status(403).json({ error: "Admin access required" });
};
