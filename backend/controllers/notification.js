const Subscription = require("../models/subscription");
const sendNotification = require("../services/mail");

const daysDifference = (today, billingDate) => {
    const timeDiff = Math.abs(billingDate.getTime() - today.getTime());
    const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
    return daysDiff <= 7;
};

const activeSubscriptionNotification = async (req, res, next) => {
    try {
        const activeSubscriptions = await Subscription.find({
            active: true,
        }).populate("user_id", "email username");

        const currentDate = new Date();

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
            );
    } catch (error) {
        next(error);
    }

    res.status(200).json({
        message: "Notifications sent successfully",
    });
};

module.exports = { activeSubscriptionNotification };
