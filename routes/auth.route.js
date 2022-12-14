const { login, register, signOut } = require("../controllers/auth.controller");
const express = require("express");
const router = express.Router();
const { validate } = require("../helpers/validation");
const { body } = require("express-validator");
const { isSigned } = require("../middleware/isSignedIn");

router.post(
    "/signup",
    validate([
        body("firstName", "firstName is required and length must be >=3")
            .isString()
            .isLength({ min: 3 }),
        body("lastName", "lastName is required length must be >=3")
            .isString()
            .isLength({ min: 3 }),
        body("email", "email is required and length must be >=8")
            .isEmail()
            .normalizeEmail()
            .isLength({ min: 8 }),
        body("password", "length must be >=5 and 15<=")
            .isString()
            .isLength({ min: 5, max: 15 }),
    ]),
    register
);

router.post(
    "/login",
    validate([
        body("email", "email is required and length must be >=8")
            .isEmail()
            .normalizeEmail()
            .isLength({ min: 8 }),
        body("password", "password must be >=5 and 15<=")
            .isString()
            .isLength({ min: 5, max: 15 }),
    ]),
    login
);
router.post("/signout", isSigned, signOut);

module.exports = router;
