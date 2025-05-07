const { MailtrapClient } = require("mailtrap");

const sendNotification = async (
    recipient,
    name,
    subscription_name,
    date,
    amount
) => {
    const TOKEN = process.env.MAIL_TRAP_TOKEN;

    const client = new MailtrapClient({
        token: TOKEN,
    });

    const sender = {
        email: process.env.MAIL_TRAP_EMAIL,
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


module.exports = sendNotification