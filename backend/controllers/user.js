const { validationResult } = require("express-validator");
const User = require("../models/user");

const getUser = async (req, res, next) => {
    const user = await User.findOne({
        _id: req.user_id,
    }).select("-password -__v -createdAt -updatedAt");

    if (!user) {
        return res.status(404).json({
            message: "User not found",
        });
    }

    return res.status(200).json({
        user,
    });
};

const updateUser = async (req, res, next) => {
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

    const { password, ...data } = req.body;

    const user = await User.findOneAndUpdate(
        {
            _id: req.user_id,
        },
        { $set: data },
        { new: true }
    ).select("-password -__v -createdAt -updatedAt");

    if (!user) {
        return res.status(404).json({
            message: "User not found",
        });
    }

    return res.status(200).json({
        user,
    });
};

module.exports = { getUser, updateUser };
