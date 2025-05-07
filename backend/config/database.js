const mongoose = require("mongoose");

const db = async () => {
    try {
        mongoose.connect(process.env.DATABASE_URI);
    } catch (error) {
        console.log(error);
    }
};

module.exports = db;