const express = require("express");
const { getUserDetails, updateUser, getUser } = require("../controllers/user");
const { isAuthenticated } = require("../middleware/auth");
const { userCheck } = require("../middleware/validator");

const router = express.Router();

router.get("", isAuthenticated, getUser);

router.patch("/update", isAuthenticated, userCheck, updateUser);

module.exports = router;
