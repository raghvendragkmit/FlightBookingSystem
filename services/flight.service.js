const Flight = require("../models/Index").db.Flight;
const Route = require("../models/Index").db.Route;

exports.createFlight = async (data, callback) => {
    try {
        const flightCreated = await Flight.create(data);
        if (flightCreated) {
            return callback(
                null,
                { message: "Flight Created Successfully" },
                201
            );
        }
    } catch (error) {
        return callback({ error: error }, null, 503);
    }
};

exports.deleteFlight = async (data, callback) => {
    try {
        const flightDeleted = await Flight.delete({
            where: {
                id: data.id,
            },
        });
        if (flightDeleted) {
            return callback(
                null,
                { message: "Flight Deleted Successfully" },
                200
            );
        }
    } catch (error) {
        return callback({ error: error }, null, 503);
    }
};

exports.searchFlight = async (data, callback) => {
    try {
        const routeData = await Route.findOne({
            where: {
                [Op.and]: [
                    { source: data.source },
                    { destination: data.destination },
                ],
            },
        });

        if (!routeData) {
            return callback({ error: "No Direct Flights" }, 404);
        }

        const flightData = await Flight.findAll({
            where: {
                RouteId: routeData.dataValues.id,
            },
        });
        if (flightData) {
            return callback(null, { result: flightData }, 200);
        }
    } catch (error) {
        return callback({ error: error }, null, 503);
    }
};

exports.getAllFlight = async (callback) => {
    try {
        const flightData = await Flight.findAll();
        if (flightData) {
            return callback(null, { result: flightData }, 200);
        }
    } catch (err) {
        return callback({ error: err }, null, 503);
    }
};
