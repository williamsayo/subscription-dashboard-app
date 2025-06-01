const nodemailer = require("nodemailer");
const path = require("path");

const template = (name, subscription_name, date, amount, dashboard) => {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Subscription Renewal Reminder</title>
  <style>
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      line-height: 1.6;
      color: #333333;
      margin: 0;
      padding: 0;
      background-color: #f9f9f9;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      background-color: #ffffff;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 4px 10px rgba(0,0,0,0.1);
    }
    .header {
      background: linear-gradient(135deg, #1A1F2C 0%, #403E43 100%);
      color: white;
      padding: 10px;
      text-align: center;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .logo {
      height: 30px;
      width: 30px;
      margin-right: 10px;
      background: white;
      padding: 4px;
      border-radius: 50%;
    }
    .header-text {
      display: inline-block;
    }
    .header h1 {
      margin: 0;
      font-size: 20px;
      font-weight: 600;
    }
    .header p {
      margin: 2px 0 0;
      opacity: 0.9;
      font-size: 14px;
    }

    .content {
      padding: 15px 25px;
    }
    .greeting {
      font-size: 18px;
      margin-bottom: 10px;
      color: #000;
    }
    .message {
        margin:0;
        padding:0;
      color: #555;
    }
    .details {
      background-color: #f7f7f7;
      border-radius: 8px;
      padding: 20px;
      margin: 25px 0;
      border-left: 4px solid #403E43
    }
    .details h3 {
      margin-top: 0;
      color: #444;
      font-size: 18px;
    }
    .details p {
      margin: 8px 0;
      display: flex;
      align-items: center;
    }
    .details strong {
      display: inline-block;
      width: 120px;
      color: #555;
    }
    .button {
      display: inline-block;
      background: linear-gradient(135deg, #1A1F2C 0%, #403E43 100%);
      color: white;
      text-decoration: none;
      padding: 12px 30px;
      border-radius: 30px;
      margin-top: 20px;
      font-weight: 500;
      text-align: center;
      box-shadow: 0 4px 10px rgba(126, 87, 194, 0.3);
      transition: transform 0.2s;
    }
    .button:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 15px rgba(126, 87, 194, 0.4);
    }
    .info-card {
      background: #f9f7ff;
      border-radius: 8px;
      padding: 15px;
      margin: 25px 0;
      display: flex;
      align-items: center;
      border: 1px solid #e8e4f3;
    }
    .info-card img {
      width: 48px;
      height: 48px;
      object-fit:cover;
      margin-right: 15px;
    }
    .info-card-content {
      flex: 1;
    }
    .info-card h4 {
      margin: 0 0 5px 0;
      color: #444;
    }
    .info-card p {
      margin: 0;
      font-size: 14px;
      color: #666;
    }
    .divider {
      height: 1px;
      background: #eee;
      margin: 25px 0;
    }
    .footer {
      text-align: center;
      padding: 20px;
      font-size: 12px;
      color: #666666;
      background-color: #f5f5f5;
      border-top: 1px solid #eeeeee;
    }
    .social-links {
      margin-top: 15px;
    }
    .social-links a {
      display: inline-block;
      margin: 0 8px;
      color: #7e57c2;
    }
    .icon {
      display: inline-block;
      vertical-align: middle;
      width: 18px;
      height: 18px;
      margin-right: 6px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <img src="https://mailsend-email-assets.mailtrap.io/7znpsjyaqkbnpag176emouud3yhn.png" alt="RemindPay Logo" class="logo">
      <div class="header-text">
        <h1>Subscription Reminder</h1>
        <p>Your service is due for renewal</p>
      </div>
    </div>
    
    <div class="content">
      <p class="greeting">Dear ${name},</p>
      
      <p class="message">We hope this message finds you well! This is a friendly reminder that your subscription for <strong>${subscription_name}</strong> is scheduled to expire on <strong>${date}</strong>.</p>
      
      <div class="details">
        <h3><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align: middle; margin-right: 6px;"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"></path><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"></path></svg> Subscription Details</h3>
        <p><strong>Name:</strong> ${subscription_name}</p>
        <p><strong>Amount:</strong> ${amount}</p>
        <p><strong>Next Billing:</strong> ${date}</p>
      </div>
      
      <div class="info-card">
        <img src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=600&h=180&fit=crop" alt="Info">
        <div class="info-card-content">
          <h4>Did you know?</h4>
          <p>Managing your subscriptions effectively can save you up to 15% annually on unnecessary services.</p>
        </div>
      </div>
      
      <p>If you wish to make any changes to your subscription before the renewal date, please visit your account dashboard. We're always here to help if you need assistance.</p>
      
      <div style="text-align: center; margin: 30px 0;">
        <a href="${dashboard}" class="button">Manage Subscription</a>
      </div>
      
      <div class="divider"></div>
    
      
      <p>Best regards,<br><strong>RemindPay</strong></p>
    </div>
    
    <div class="footer">
      <p>© 2025 RemindPay. All rights reserved.</p>
      <p>This is an automated message, please do not reply to this email.</p>
      <div class="social-links">
        <a href="#">Twitter</a> • 
        <a href="#">Facebook</a> • 
        <a href="#">Instagram</a>
      </div>
    </div>
  </div>
</body>
</html>`;
};

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
            viewPath: path.resolve(process.cwd(), "template"),
            extName: ".hbs",
        })
    );

    const mailInfo = await transporter.sendMail({
        from: { name: "Remind Pay", address: process.env.GMAIL_USER },
        to: recipient,
        subject: "Your Subscription is Ending Soon",
        text: "Subscription notification",
        html: template(
            name,
            subscription_name,
            date,
            amount,
            process.env.DASHBOARD_LINK || " http://localhost:3000/dashboard"
        ),
        // template: "email_notification.hbs",
        // context: {
        //     name,
        //     subscription_name,
        //     date,
        //     amount,
        //     dashboard:
        //         process.env.DASHBOARD_LINK ||
        //         " http://localhost:3000/dashboard",
        // },
    });

    return mailInfo;
};

module.exports = sendNotification;
