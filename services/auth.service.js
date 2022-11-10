const User = require("../models/Index").db.User;
const { createHash, compareHash } = require("../helpers/hash");
const { createToken } = require("../helpers/token");

exports.createUser = async (data, callback) => {
    try {
        const userExist = await User.findOne({ where: { email: data.email } });
        if (userExist) {
            return callback({ error: "User alreay exist" }, null, 409);
        }

        data.password = await createHash(data.password);
        const userCreated = await User.create(data);

        if (userCreated) {
            return callback(
                null,
                { message: "User created successfully" },
                201
            );
        }
    } catch (error) {
        return callback({ error: error }, null, 503);
    }
};

exports.loginUser = async (data, callback) => {
    try {
        const userExist = await User.findOne({ where: { email: data.email } });
        if (!userExist) {
            return callback({ error: "User Not Found" }, null, 401);
        }
        const userId = userExist.dataValues.id;
        const userType = userExist.dataValues.type;
        let validate_password = await compareHash(
            data.password,
            userExist.dataValues.password
        );
        if (validate_password) {
            const token = createToken({
                id: userId,
                type: userType,
            });
            return callback(
                null,
                { message: "Login Successfull", token: token },
                200
            );
        } else {
            return callback({ error: "Wrong Credentials" }, null, 401);
        }
    } catch (error) {
        return callback({ error: error }, null, 503);
    }
};
