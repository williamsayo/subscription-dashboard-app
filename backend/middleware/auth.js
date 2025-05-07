const jwt = require("jsonwebtoken");

const isAuthenticated = (req, res, next) => {
    try {
        const authorization = req.headers.authorization;

        if (!authorization) {
            const error = new Error("Authentication credentials not provided");
            error.statusCode = 401;
            throw error;
        }

        const token = authorization.split(" ")[1];

        const decodedToken = jwt.verify(token, process.env.JSON_SECRET_KEY);

        if (!decodedToken) {
            const error = new Error("Not authenticated");
            error.statusCode = 401;
            throw error;
        }

        req.user_id = decodedToken.user_id;
        next();
    } catch (error) {
        console.log(error);
        if (error instanceof jwt.JsonWebTokenError) {
            error.statusCode = 401;
            error.message = "Invalid token";
        }

        next(error);
    }
};

const notificationAuthentication = (req, res, next) => {
    try {
        const authorization = req.headers.authorization;

        if (!authorization) {
            const error = new Error("Unauthenticated");
            error.statusCode = 401;
            throw error;
        }

        const token = authorization.split(" ")[1];

        if (token !== process.env.CRON_SECRET) {
            const error = new Error("Unauthenticated");
            error.statusCode = 401;
            throw error;
        }

        next();
    } catch (error) {
        next(error);
    }
};

module.exports = { isAuthenticated, notificationAuthentication };
