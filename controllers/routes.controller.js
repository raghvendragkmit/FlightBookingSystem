const db = require("../connection")

exports.createRoutes = (req, res) => {
	let { source, destination } = req.body

	console.log(source, destination)
	if (!source || !destination) return res.status(400).json({ message: "Please enter all required details" })

	db.query("select * from Routes where source=? AND destination=?", [source, destination], (err, result) => {
		if (err) {
			return res.status(500).json({ error: err })
		} else if (result.length >= 1) {
			return res.status(409).json({ message: "already exist" })
		} else {
			db.query("insert into Routes(source,destination) values(?,?)", [source, destination], (err, result) => {
				if (err) return res.status(503).json({ message: "Please try after sometime" })
				return res.status(201).json({ message: "Success" })
			})
		}
	})
}

exports.getAllRoutes = (req, res) => {
	db.query("select * from Routes", (err, result) => {
		if (err) {
			return res.status(503).json({ message: "cannot access database" })
		}
		return res.status(200).json(result)
	})
}

exports.deleteRoutes = (req, res) => {
	const id = req.query.id
	if (!id) {
		return res.status(503).json({ message: "Please try afterSometime" })
	} else {
		db.query("delete from Routes where id=?", [id], (err, result) => {
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
