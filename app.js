const cookieParser = require("cookie-parser")
const express = require("express")
const dotenv = require("dotenv")
const app = express()
const db = require("./connection")
const authRouter = require("./routes/auth.route")
dotenv.config()

//checking database connection
db.connect((error) => {
	if (error) {
		console.log(error)
	} else {
		console.log("MySQL connected!")
	}
})

app.use(express.json())
app.use(cookieParser())

app.use("/api/auth", authRouter)

module.exports = app
