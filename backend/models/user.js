const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: [true, "An email address is required."],
            unique: true,
            lowercase: true,
            validate: {
                validator: (data) => {
                    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
                        data
                    );
                },
                message: (props) => `${props.value} is not a valid email!`,
            },
        },
        password: {
            type: String,
            minLength: 6,
            required: true,
        },
        phone: {
            type: String,
            required: false,
            unique: true,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
