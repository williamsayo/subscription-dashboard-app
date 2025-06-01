const express = require("express");
const { isAuthenticated, cronAuthentication } = require("../middleware/auth");
const {
    getUserSubscriptions,
    getUserSubscription,
    addSubsciption,
    updateUserSubscription,
    updateNextBillingDates,
} = require("../controllers/subscription");
const { subscriptionCheck } = require("../middleware/validator");

const router = express.Router();

router.get("", isAuthenticated, getUserSubscriptions);

router.get("/update-next-billing", cronAuthentication, updateNextBillingDates);

router.get("/:id", isAuthenticated, getUserSubscription);

router.patch("/:id", isAuthenticated, updateUserSubscription);

router.post("/add", isAuthenticated, subscriptionCheck, addSubsciption);

module.exports = router;
