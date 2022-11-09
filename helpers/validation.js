const express = require("express");
const { validationResult, ValidationChain } = require("express-validator");

// sequential processing, stops running validations chain if the previous one have failed.
const validate = (validations) => {
    return async (req, res, next) => {
        for (let validation of validations) {
            const result = await validation.run(req);
            if (result.errors.length) break;
        }

        const errors = validationResult(req);
        if (errors.isEmpty()) {
            return next();
        }

        return res.status(400).json({ errors: errors.array() });
    };
};

module.exports = { validate };
