const mongoose = require("mongoose");

const workoutSchema = new mongoose.Schema({
    userId: {
        type: String,
        requred: [true, "Make sure that you are logged in."]
    },
    name :{
        type: String,
        required: [true, "Workout must have a name."]
    },
    duration: {
        type: String,
        requred: [true, "Workout must have a duration."]
    },
    status: {
        type: String,
        default: "Pending"

    },
    dateAdded: {
        type: Date,
		default: Date.now
    }
})

module.exports = mongoose.model("workout", workoutSchema);