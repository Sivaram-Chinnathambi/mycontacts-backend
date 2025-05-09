const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please enter user name"]
    },
    email: {
        type: String,
        required: [true, "Please enter the email"],
        unique: [true, "Email address is already registered!"]
    },
    password: {
        type: String,
        required: [true, "Please add the user password"]
    }
}, {
    Timestamp: true
});

module.exports = mongoose.model("user", userSchema);