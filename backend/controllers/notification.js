const Subscription = require("../models/subscription");
const User = require("../models/user");
const sendNotification = require("../services/mail");

const daysDifference = (today, billingDate) => {
    const timeDiff = Math.abs(billingDate.getTime() - today.getTime());
    const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
    return daysDiff <= 7;
};

const activeSubscriptionNotification = async (req, res, next) => {
    try {
        const currentDate = new Date();

        const activeSubscriptions = await Subscription.find({
            active: true,
            nextBilling: { $gte: currentDate.toISOString() },
        }).populate("user_id", "email username");

        await Promise.all(
            activeSubscriptions
                .filter((subscription) =>
                    daysDifference(
                        currentDate,
                        new Date(subscription.nextBillingDate)
                    )
                )
                .map((subscription) =>
                    sendNotification(
                        subscription.user_id.email,
                        subscription.user_id.username,
                        subscription.name,
                        subscription.nextBilling.toLocaleDateString(),
                        subscription.amount
                    )
                )
        );

        res.status(200).json({
            message: "Email notifications sent successfully",
        });
    } catch (error) {
        next(error);
    }
};

const testNotification = async (req, res, next) => {
    try {
        const user = await User.findById(req.user_id);

        if (!user) {
            return res.status(404).json({
                message: "User not found",
            });
        }

        sendNotification(
            user.email,
            user.username,
            "test_subscription",
            new Date().toLocaleDateString(),
            "test_amount"
        );

        res.status(200).json({
            message: "Email notification sent successfully",
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    activeSubscriptionNotification,
    testNotification,
};
