const connection = require("../connection")
const bcrypt = require("bcrypt")
const dotenv = require("dotenv")
const jwt = require("jsonwebtoken")
const db = require("../connection")
dotenv.config()

const createToken = (data) => {
	const token = jwt.sign(data, process.env.SECRET)
	return token
}

exports.registerPassenger = (req, res) => {
	const firstName = req.body.firstName
	const lastName = req.body.lastName
	const email = req.body.email
	let password = req.body.password

	if (firstName == "" || lastName == "" || email == "" || password == "") {
		return res.status(400).json({
			message: "please enter all required  details",
		})
	}

	db.query("select * from Passengers where email = ?", [email], (err, result) => {
		if (err) {
			return res.status(500).json({ error: err })
		} else if (result.length >= 1) {
			return res.status(409).json({ message: "already registered please login" })
		} else if (result.length == 0) {
			password = bcrypt.hashSync(password, 10)
			console.log(password)
			db.query(
				"insert into Passengers(firstName,lastName,email,password) values(?,?,?,?)",
				[firstName, lastName, email, password],
				(err, result) => {
					if (err) return res.status(500).json({ error: err })
					return res.status(201).json({ message: "registered" })
				}
			)
		}
	})
}

exports.login = (req, res) => {
	const email = req.body.email
	let password = req.body.password

	if (email == "" || password == "") {
		return res.status(400).json({
			message: "please enter all required  details",
		})
	} else if (email == "admin@flightbooking.com" && password == process.env.ADMIN_PASSWORD) {
		const token = createToken({ id: 1, email: email })
		res.cookie("token", token, { expire: new Date() + 100000 })
		return res.status(200).json({ message: "login successfully", token: token })
	} else {
		db.query("select * from Passengers", (err, result) => {
			if (result.length == 0) return res.status(404).json({ message: "email address is not registered yet" })

			let validate_password = bcrypt.compareSync(password, result[0].password)

			if (validate_password) {
				const token = createToken({ id: result[0].id, email: result[0].email })
				res.cookie("token", token, { expire: new Date() + 100000 })
				return res.status(200).json({
					message: "Login successfully",
					token: token,
				})
			} else {
				return res.status(404).json({ message: "wrong credentials" })
			}
		})
	}
}
