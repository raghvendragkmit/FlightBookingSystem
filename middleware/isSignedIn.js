const jwt = require('jsonwebtoken')
const dotenv = require("dotenv");
exports.isSigned = (req, res, next) => {
    const token = req.cookies["token"];
    if (token == null)
        return res.status(401).json({ message: "Please login" });
    jwt.verify(token, process.env.SECRET, (err, result) => {
        if (err)
            return res.status(401).json({ message: "Please login" })
        if (result)
        {
            req.id = result.id;
            req.email = result.email;
            return next();
        }
    })
}