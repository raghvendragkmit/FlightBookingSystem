const { validate_Token } = require("../helpers/token");

exports.isSigned = (req, res, next) => {
  const token = req.cookies["token"];
  console.log(token);
  if (token == null) {
    return res.status(401).json({ message: "NO TOKEN FOUND" });
  }
  const result = validate_Token(token);
  console.log(result);
  if (result) {
    req.id = result.id;
    req.type = result.type;
    return next();
  } else {
    return res.status(401).json({ message: "Please login" });
  }
};
