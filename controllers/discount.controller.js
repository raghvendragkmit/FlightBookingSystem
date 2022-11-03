const db = require("../connection")

exports.getAllDiscounts = (req, res) => {
	db.query("select * from Discounts", (err, result) => {
		if (err) return res.status(503).json({ message: err })
		return res.status(200).json(result)
	})
}

exports.createDiscounts = (req, res) => {
	let { offer } = req.body

	if (!offer) {
		return res.status(400).json({ message: "Please enter all required details" })
	}
	db.query("insert into Discounts(offer) values(?)", [offer], (err, result) => {
		if (err) return res.status(503).json({ message: err })
		return res.status(201).json({ message: "Success" })
	})
}

exports.deleteDiscounts = (req, res) => {
	const id = req.query.id
	if (!id) {
		return res.status(503).json({ message: "enter discount id" })
	} else {
		db.query("delete from Discounts where id=?", [id], (err, result) => {
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

exports.applyDiscounts = (req, res) => {
	const id = req.query.id
	const couponId = req.body.id
	let amount = 0,
		discount = 0
	if (!id || !couponId) {
		return res.status(400).json({ message: "Please enter booking id and coupon id" })
	}
	db.query(
		"select Flights.airlineName, Bookings.id, Bookings.totalAmount from Flights INNER JOIN Bookings ON Bookings.flightId  = Flights.id where Bookings.passengerId = ? AND Bookings.id = ?",
		[req.id, id],
		(err, result) => {
			if (err) {
				return res.status(500).json({ error: err })
			}
			amount = result[0].totalAmount
			db.query(
				"select * from Discounts where id = ? AND availableOn = ?",
				[couponId, result[0].airlineName],
				(err, result1) => {
					if (err) {
						return res.status(500).json({ error: err })
					} else if (result.length == 0) {
						return res.status(200).json({ message: "No discounts available on booking" })
					}
					discount = result1[0].amount
					db.query(
						"update Bookings set totalAmount = ? where id = ?",[amount-discount, id],
						(err, result) => {
							if (err) {
								return res.status(500).json({ error: err })
							}
							return res.status(200).json({ message: "discount applied" })
						}
					)
				}
			)
		}
	)
}
