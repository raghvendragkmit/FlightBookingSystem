const db = require("../connection")

exports.bookTickets = (req, res) => {
    let { flightId, seats } = req.body
    let capacity = 0;
	if (!flightId || !seats) {
		return res.status(400).json({ message: "Please enter flight Id" })
	}
	db.query("select capacity,ticketPrice from Flights where id = ?", [flightId], (err, result) => {
		if (err) {
			return res.status(503).json({ message: err })
		} else if (result.length > 0) {
			if (seats > result[0].capacity) {
				return res.status(200).json({
					message: `${result[0].capacity} seats available`,
				})
            }
            
            capacity = result[0].capacity;
			db.query(
				"insert into Bookings(passengerId,flightId,totalAmount) values(?,?,?)",
				[req.id, flightId, seats * result[0].ticketPrice],
				(err, result1) => {
					if (err) return res.status(500).json({ message: err })
					else {
						db.query(
							"update Flights set capacity = ? where id = ?",
							[capacity - seats, flightId],
							(err, result2) => {
								if (err) {
									return res.status(500).json({ error: err })
								}
								return res.status(200).json({ message: "booking confirm proceed to payment" })
							}
						)
					}
				}
			)
		}
		// return res.status(200).json(result)
	})
}
