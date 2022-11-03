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

