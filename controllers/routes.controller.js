const {
    createRoute,
    getAllRoute,
    deleteRoute,
} = require("../services/routes.service");
exports.createRoutes = (req, res) => {
    console.log(req.body);
    createRoute({ ...req.body }, (err, result, status_code) => {
        return res.status(status_code).json(err ? err : result);
    });
};

exports.allRoutes = (req, res) => {
    getAllRoute((err, result, status_code) => {
        return res.status(status_code).json(err ? err : result);
    });
};

exports.deleteRoutes = (req, res) => {
    const id = Number.parseInt(req.query.id);
    console.log(typeof id);
    if (!id || typeof id !== "number") {
        return res.status(400).json({ error: "Please enter routeId" });
    } else {
        deleteRoute({ id: id }, (err, result, status_code) => {
            return res.status(status_code).json(err ? err : result);
        });
    }
};
