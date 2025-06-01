const Subscription = require("../models/subscription");
const { validationResult } = require("express-validator");

const addSubsciption = async (req, res, next) => {
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

        const subscription = await Subscription.create({
            user_id: req.user_id,
            name: req.body.subscription_name,
            amount: req.body.amount,
            billingFrequency: req.body.billing_frequency,
            originalBillingDate: req.body.billing_date,
        });

        subscription.save();

        res.status(201).json({
            message: "Subscription created successfully",
            subscription,
        });

    } catch (error) {
        next(error);
    }
};

const getUserSubscriptions = async (req, res, next) => {
    const subscriptions = await Subscription.find({ user_id: req.user_id });

    if (!subscriptions) {
        return res.status(404).json({
            message: "User does not have any subscription",
        });
    }

    return res.status(200).json({
        subscriptions,
    });
};

const getUserSubscription = async (req, res, next) => {
    const id = req.params.id;
    const subscriptions = await Subscription.findOne({
        user_id: req.user_id,
        _id: id,
    });

    if (!subscriptions) {
        return res.status(404).json({
            message: "subscription not found",
        });
    }

    return res.status(200).json({
        subscriptions,
    });
};

const updateUserSubscription = async (req, res, next) => {
    const id = req.params.id;
    const subscription = await Subscription.findOne({
        user_id: req.user_id,
        _id: id,
    });

    if (!subscription) {
        return res.status(404).json({
            message: "subscription not found",
        });
    }

    subscription.active = !subscription.active;
    subscription.save();

    return res.status(200).json({
        message: "Updated successfully",
        subscription,
    });
};

const updateNextBillingDates = async (req, res, next) => {
    try {
        const currentDate = new Date();

        const subscriptions = await Subscription.find({
            active: true,
            nextBilling: { $lte: currentDate.toISOString() },
        });

        const bulkOperation = subscriptions.map((subscription) => {
            const updatedNextBilling = Subscription.getNextBillingDate(
                subscription.nextBilling,
                subscription.billingFrequency
            );

            return {
                updateOne: {
                    filter: { _id: subscription._id },
                    update: { $set: { nextBilling: updatedNextBilling } },
                },
            };
        });

        await Subscription.bulkWrite(bulkOperation);

        res.status(200).json({
            message: "Updated next biliing dates successfully",
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getUserSubscriptions,
    getUserSubscription,
    updateUserSubscription,
    addSubsciption,
    updateNextBillingDates,
};
