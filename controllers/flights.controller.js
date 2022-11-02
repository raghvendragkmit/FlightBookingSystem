const db = require("../connection")

exports.createFlights = (req, res) => {
	let { airlineName, routeId, takeOffTime, landingTime, capacity, ticketPrice, date } = req.body

	console.log(airlineName, routeId, takeOffTime, landingTime, capacity, ticketPrice, date)
	if (!airlineName || !routeId || !takeOffTime || !landingTime || !capacity || !ticketPrice || !date) {
		return res.status(400).json({ message: "Please enter all required details" })
	}
	db.query(
		"insert into Flights(airlineName, routeId, takeOffTime, landingTime, capacity, ticketPrice, date) values(?,?,?,?,?,?,?)",
		[airlineName, routeId, takeOffTime, landingTime, capacity, ticketPrice, date],
		(err, result) => {
			if (err) return res.status(503).json({ message: err })
			return res.status(201).json({ message: "Success" })
		}
	)
}

exports.deleteFlights = (req, res) => {
	const id = req.query.id
	if (!id) {
		return res.status(503).json({ message: "enter flight id" })
	} else {
		db.query("delete from Flights where id=?", [id], (err, result) => {
			if (err) {
				return res.status(503).json({ message: "cannot access database" })
			}

			if (result.length == 0) return res.status(404).json({ message: "Not Found" })

			return res.status(200).json({
				message: "Successfully deleted",
			})
		})
	}
}
