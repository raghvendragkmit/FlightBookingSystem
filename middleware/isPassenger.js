const dotenv = require("dotenv")
dotenv.config()
const db = require("../connection")
exports.isPassenger = (req, res, next) => {
	let id = req.id
	let email = req.email
	if (id != process.env.ADMIN_ID && email != process.env.ADMIN_EMAIL) return next()
	else return res.status(401).json({ error: "login required" })
}
