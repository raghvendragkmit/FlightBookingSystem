const {
    createFlight,
    deleteFlight,
    searchFlight,
    getAllFlight,
} = require("../services/flight.service");
exports.createFlights = (req, res) => {
    createFlight(req.body, (err, result, status_code) => {
        if (err) {
            return res.status(status_code).json(err);
        }
        return res.status(status_code).json(result);
    });
};

exports.deleteFlights = (req, res) => {
    const id = Number(req.query.id);
    console.log(typeof id);
    if (Number.isInteger(id)) {
        deleteFlight(id, (err, result, status_code) => {
            if (err) {
                return res.status(status_code).json(err);
            }
            return res.status(status_code).json({ result });
        });
    } else {
        return res.status(400).json({ error: "id must be integer" });
    }
};

exports.searchFlights = (req, res) => {
    searchFlight(req.body, (err, result, status_code) => {
        return res.status(status_code).json(err ? err : result);
    });
};

exports.allFlights = (req, res) => {
    getAllFlight((err, result, status_code) => {
        return res.status(status_code).json(err ? err : result);
    });
};
