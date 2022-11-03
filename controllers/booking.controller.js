const db = require("../connection")

exports.bookTickets = (req, res) => {
	let { flightId, seats } = req.body
	console.log(flightId, seats)
	if (!flightId || !seats) {
		return res.status(400).json({ message: "Please enter flight Id" })
	}
	db.query("select capacity,ticketPrice from Flights where id = ?", [flightId], (err, result) => {
		if (err) {
			return res.status(503).json({ message: err })
		} else if (result && seats > result[0].capacity) {
			return res.status(200).json({
				message: `${result[0].capacity} seats available`,
			})
		} else {
			db.query(
				"insert into Bookings(passengerId,flightId,totalAmount) values(?,?,?)",
				[req.id, flightId, seats * result[0].ticketPrice],
				(err, result1) => {
					if (err) {
						return res.status(500).json({ error: err })
					}
					return res.status(200).json({ message: "booking confirm proceed to payment" })
				}
			)
		}
	})
}

exports.getBookingDetails = (req, res) => {
	const id = req.id
	db.query("select * from Bookings where passengerId = ?", [req.id], (err, result) => {
		if (err) {
			return res.status(500).json({ error: err })
		}
		return res.status(200).json(result)
	})
}
