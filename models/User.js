const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
	email: {
		type: String,
		required: [true, "email is Required"]
	},
	password: {
		type: String,
		required: [true, "Password is Required"]
	}
})

module.exports = mongoose.model("user", userSchema);