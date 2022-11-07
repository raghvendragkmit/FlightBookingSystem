const { create_Flight, delete_Flight } = require("../services/flight.service");
exports.create_Flights = (req, res) => {

  create_Flight(req.body, (err, result, status_code) => {
    if (err) {
      return res.status(status_code).json(err)
    }
    return res.status(status_code).json(result);
  })
}

exports.delete_Flights = (req, res) => {
  const id = req.query.id
  if ((typeof id === "number")) {
    delete_Flight(id, (err, result, status_code) => {
      if (err) {
        return res.status(status_code).json(err);
      }
      return res.status(status_code).json({ result });
    });
  }
  else {
    return res.status(400).json({ "error": "id must be integer" });
  }
}

exports.search_Flights = (req, res) => {
  search_Flight(req.body, (err, result, status_code) => {
    if (err) {
      return res.status(status_code).json(err)
    }
    return res.status(status_code).json(result);
  })
}
