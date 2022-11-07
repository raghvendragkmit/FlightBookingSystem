const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const db = require("../connection");
dotenv.config();

const { create_Passenger, login_Passenger } = require("../services/auth.service");


exports.register = (req, res) => {
    create_Passenger(req.body, (err, result, status_code) => {
        if (err) {
            return res.status(status_code).json({
                "message": err
            })
        }
        return res.status(status_code).json({ "message": result })
    })
};

exports.login = (req, res) => {
    login_Passenger(req.body, (err, result, status_code) => {
        if (err) {
            return res.status(status_code).json({ "error": err });
        }
        console.log(result.token);
        res.cookie("token", result.token, { expire: new Date() + 100000 });
        return res.status(status_code).json({ result })
    })
};

exports.signOut = (req, res) => {
    res.clearCookie("token");
    return res.status(200).json({
        message: "Logout Successfully",
    });
};
