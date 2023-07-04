const User = require("../models/User")

exports.getUserById = (userId) => {
    return User.findById(userId);
}