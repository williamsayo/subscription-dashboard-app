require("dotenv").config();
const db = require("../config/database");
const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const subscriptionRoutes = require("../routes/subscription");
const authRoutes = require("../routes/auth");
const userRoutes = require("../routes/user");
const notificationRoutes = require("../routes/notification");
const cors = require("cors");
const helmet = require("helmet");

const app = express();

app.use(cors());
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/subscription", subscriptionRoutes);
app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use("/notification", notificationRoutes);

app.use((error, req, res, next) => {
    errorResponse = {
        message: error.message ?? undefined,
        errors: error.validationError ?? undefined,
    };

    return res.status(error.statusCode || 500).json(errorResponse);
});

try {
    db();
    mongoose.connection.once("open", () => {
        console.log("connected to mongodb");
        app.listen(process.env.PORT || 3030);
    });
} catch (error) {
    console.log("Server Error");
}


module.exports = app;