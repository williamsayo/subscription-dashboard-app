const { body } = require("express-validator");
const User = require("../models/user");

const emailTypeCheck = body("email")
    .trim()
    .isEmail()
    .withMessage("Invalid email value")
    .normalizeEmail();

const emailUniqueCheck = body("email")
    .trim()
    .custom(async (value, { req }) => {
        const user = await User.findOne({ email: value });
        if (user) return Promise.reject("E-mail already exists");
        return true;
    })
    .normalizeEmail();

const passwordLengthCheck = body("password")
    .trim()
    .isLength({ min: 6 })
    .withMessage("Password must be minimum of 6 characters long");

const passwordEqualityCheck = body("confirm_password")
    .trim()
    .custom((value, { req }) => {
        if (req.body.password !== value) throw Error("Passwords do not match.");
        return true;
    });

const subscriptionCheck = [
    body("subscription_name", "Subscription name field is required")
        .trim()
        .notEmpty(),
    body("amount")
        .trim()
        .notEmpty()
        .withMessage("Subscription amount field is required")
        .isNumeric()
        .withMessage("amount must be a number"),
    body("billing_frequency", "Billing frequency field is required")
        .trim()
        .notEmpty(),
    body("billing_date")
        .trim()
        .isDate({ strictMode: true, format: "YYYY-MM-DD" })
        .withMessage("Must be a date and of format YYYY-MM-DD"),
];

const phoneRegex = /^\+{1}([0-9]{5,14})$/;

const userCheck = [
    body("username", "username must be a minimum of 4 characters")
        .trim()
        .isLength({ min: 4 }),
    emailTypeCheck,
    body("phone", "invalid phone number")
        .trim()
        .optional()
        .custom((value) => phoneRegex.test(value)),
];

module.exports = {
    emailTypeCheck,
    emailUniqueCheck,
    passwordLengthCheck,
    passwordEqualityCheck,
    subscriptionCheck,
    userCheck,
};
