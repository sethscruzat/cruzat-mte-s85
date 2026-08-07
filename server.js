const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors"); 
require("dotenv").config();

const { errorHandler } = require("./middleware/auth");
const workoutRoutes = require("./routes/workout");
const userRoutes = require("./routes/user");

const app = express();

const corsOptions = {
    origin: ['http://localhost:4000/', 
        "http://localhost:3000/", 
    ],
    credentials: true,
    optionsSuccessStatus: 200
}

app.use(cors());

mongoose.connect(process.env.MONGODB_URI);
let db = mongoose.connection;
db.on("error", console.error.bind(console, "can not connect to database"));
db.once("open", () => console.log("Connected to the database"));

app.use(express.json());

app.use("/workouts", workoutRoutes);
app.use("/users", userRoutes);
app.use(errorHandler);

if(require.main == module){
    app.listen(process.env.PORT || 3000, () => console.log(`Server is running at port ${process.env.PORT || 3000}`));
}

module.exports = {app, mongoose}