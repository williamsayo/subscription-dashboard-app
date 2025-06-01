const express = require("express");
const {
    activeSubscriptionNotification,
    testNotification,
} = require("../controllers/notification");
const { cronAuthentication, isAuthenticated } = require("../middleware/auth");

const router = express.Router();

router.get(
    "/email/send-reminders",
    cronAuthentication,
    activeSubscriptionNotification
);

router.get("/email/test-reminder", isAuthenticated, testNotification);

module.exports = router;
