const User = require("../models/user");
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const getJwtToken = ({ _id, username, email }) => {
    const token = jwt.sign(
        {
            user_id: _id.toString(),
            username: username,
            email: email,
        },
        process.env.JSON_SECRET_KEY
        // {
        //     expiresIn: "1h",
        // }
    );

    return token;
};

const register = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const errorFields = Object.fromEntries(
                errors.array().map((error) => [error.path, error.msg])
            );
            const error = new Error();
            error.message = undefined;
            error.validationError = errorFields;
            error.statusCode = 422;
            throw error;
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        const user = await User.create({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
            // phoneNumber: req.body.phoneNumber,
        });

        user.save();

        res.status(201).json({
            message: "user created successfully",
            token: getJwtToken(user),
        });
    } catch (error) {
        next(error);
    }
};

const login = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const errorFields = Object.fromEntries(
                errors.array().map((error) => [error.path, error.msg])
            );

            const error = new Error();
            error.message = undefined;
            error.validationError = errorFields;
            error.statusCode = 422;
            throw error;
        }

        const user = await User.findOne({ email: req.body.email });

        if (!user) {
            const error = new Error("Incorrect username or password");
            error.statusCode = 401;
            throw error;
        }

        const isPassword = await bcrypt.compare(
            req.body.password,
            user.password
        );

        if (!isPassword) {
            const error = new Error("Incorrect email or password");
            error.statusCode = 401;
            throw error;
        }

        res.status(200).json({ token: getJwtToken(user) });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    register,
    login,
};
