const express = require('express')
const validators = require("../middleware/validator");
const authController = require("../controllers/auth");

const router = express.Router()

// POST /auth/login
router.post(
    "/login",
    [validators.emailTypeCheck, validators.passwordLengthCheck],
    authController.login
);

// POST /auth/signup
router.post(
    "/signup",
    [
        validators.emailTypeCheck,
        validators.emailUniqueCheck,
        validators.passwordLengthCheck,
        validators.passwordEqualityCheck,
    ],
    authController.register
);


module.exports = router