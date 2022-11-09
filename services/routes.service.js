const Route = require("../models/Index").db.Route;

exports.createRoute = async (data, callback) => {
    try {
        const routeData = await Route.findOne({
            where: {
                [Op.and]: [
                    { source: data.source },
                    { destination: data.destination },
                ],
            },
        });

        if (routeData) {
            return callback({ error: "Route Already exist" }, 400);
        }

        const routeCreated = await Route.create(data);
        if (routeCreated) {
            return callback(
                null,
                { result: "Route Created Successfully" },
                201
            );
        }
    } catch (error) {
        return callback({ error: error }, null, 503);
    }
};

exports.getAllRoute = async (callback) => {
    try {
        const routeData = await Route.findAll();
        if (routeData) {
            return callback(null, { result: routeData }, 200);
        }
    } catch (error) {
        return callback({ error: err }, null, 503);
    }
};

exports.deleteRoute = async (data, callback) => {
    try {
        const routeDeleted = await Route.delete({
            where: {
                id: data.id,
            },
        });
        if (routeDeleted) {
            return callback(
                null,
                { message: "Routed Deleted Successfully" },
                200
            );
        }
    } catch (error) {
        return callback({ error: error }, null, 503);
    }
};
