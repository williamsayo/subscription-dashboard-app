const { MailtrapClient } = require("mailtrap");

const nodemailer = require("nodemailer");
const path = require("path");

const sendNotification = async (
    recipient,
    name,
    subscription_name,
    date,
    amount
) => {
    const { default: nodemailerHandlebars } = await import(
        "nodemailer-express-handlebars"
    );
    const transporter = nodemailer.createTransport({
        service: "gmail",
        host: "smtp.gmail.com",
        secure: false, // use TLS
        port: 587,
        auth: {
            user: process.env.GMAIL_USER,
            pass: process.env.GMAIL_PASS,
        },
        from: process.env.GMAIL_USER,
    });

    transporter.use(
        "compile",
        nodemailerHandlebars({
            viewEngine: {
                defaultLayout: false,
            },
            viewPath: path.join(process.mainModule.path, "template"),
            extName: ".hbs",
        })
    );

    const mailInfo = await transporter.sendMail({
        from: { name: "Remind Pay", address: process.env.GMAIL_USER },
        to: recipient,
        subject: "Your Subscription is Ending Soon",
        text: "Subscription notification",
        template: "email_notification",
        context: {
            name,
            subscription_name,
            date,
            amount,
            dashboard:
                process.env.DASHBOARD_LINK ||
                " http://localhost:3000/dashboard",
        },
    });

    return mailInfo;
};

// const sendNotification = async (
//     recipient,
//     name,
//     subscription_name,
//     date,
//     amount
// ) => {
//     const TOKEN = process.env.MAIL_TRAP_TOKEN;

//     const client = new MailtrapClient({
//         token: TOKEN,
//     });

//     const sender = {
//         email: process.env.MAIL_TRAP_EMAIL,
//         name: "Remind-pay",
//     };
//     const recipients = [
//         {
//             email: "williamsayo24@gmail.com",
//         },
//     ];

//     const mail = await client.send({
//         from: sender,
//         to: recipients,
//         template_uuid: process.env.MAIL_TRAP_TEMPLATE_UUID,
//         template_variables: {
//             name,
//             subscription_name,
//             date,
//             amount,
//             dashboard: process.env.DASHBOARD_LINK,
//         },
//     });
// };

module.exports = sendNotification;
