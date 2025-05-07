const express = require("express");
const {
    activeSubscriptionNotification,
} = require("../controllers/notification");
const { notificationAuthentication } = require("../middleware/auth");

const router = express.Router();

router.get(
    "/email/send-reminders",
    notificationAuthentication,
    activeSubscriptionNotification
);

module.exports = router;
