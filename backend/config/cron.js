const Subscription = require("../models/subscription");
const cron = require("node-cron");
const { MailtrapClient } = require("mailtrap");

const daysDifference = (today, billingDate) => {
    const timeDiff = Math.abs(billingDate.getTime() - today.getTime());
    const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
    return daysDiff <= 30;
};

const sendNotification = async (
    recipient,
    name,
    subscription_name,
    date,
    amount,
) => {
    const TOKEN = process.env.MAIL_TRAP_TOKEN;

    const client = new MailtrapClient({
        token: TOKEN,
    });

    const sender = {
        email: "hello@demomailtrap.co",
        name: "Remind-pay",
    };
    const recipients = [
        {
            email: "williamsayo24@gmail.com",
        },
    ];

    const mail = await client.send({
        from: sender,
        to: recipients,
        template_uuid: process.env.MAIL_TRAP_TEMPLATE_UUID,
        template_variables: {
            name,
            subscription_name,
            date,
            amount,
            dashboard: process.env.DASHBOARD_LINK,
        },
    });
};

const subscriptionDue = async () => {
    const activeSubscriptions = await Subscription.find({
        active: true,
    }).populate("user_id", "email username");

    const currentDate = new Date();

    const billing = activeSubscriptions
        .filter((subscription) =>
            daysDifference(currentDate, new Date(subscription.nextBillingDate))
        )
        .map((subscription) => ({
            subscriptionName: subscription.name,
            amount: subscription.amount,
            billingDate: new Date(
                subscription.nextBillingDate
            ).toLocaleDateString(),
            userName: subscription.user_id.username,
            email: subscription.user_id.email,
        }));

    billing.map((data) =>
        sendNotification(
            data.email,
            data.userName,
            data.subscriptionName,
            data.billingDate,
            data.amount
        )
    );
};

const dailyCronJob = () => {
    cron.schedule("*/10 * * * * *", async () => {
        subscriptionDue();
    });
};

module.exports = dailyCronJob;
