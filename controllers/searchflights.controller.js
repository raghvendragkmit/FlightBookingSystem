const db = require("../connection")

exports.searchFlights = (req, res) => {
	let { source, destination } = req.body

	if (!source || !destination) return res.status(400).json({ message: "Please enter all required details" })
	db.query("select id from Routes where source=? AND destination=?", [source, destination], (err, result) => {
		if (err) {
			return res.status(500).json({ error: err })
		} else if (result.length >= 1) {
			db.query(
				"select id airlineName,takeOffTime, landingTime, capacity, ticketPrice, date from Flights where routeId = ?",
				[result[0].id],
				(err, result) => {
					if (err) {
						return res.status(503).json({ error: err })
					} else if (result.length >= 1) {
						return res.status(200).json(result)
					} else {
						return res.status(200).json({ message: "No direct flights" })
					}
				}
			)
		} else {
			return res.status(200).json({ message: "No direct flights" })
		}
	})
}
