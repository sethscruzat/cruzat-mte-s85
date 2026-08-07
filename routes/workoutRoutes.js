const express = require("express");
const router = express.Router();

const { verify } = require("../middleware/auth.js");
const workoutController = require("../controllers/workoutController.js")

router.post("/addWorkout", verify, workoutController.addWorkout);

router.get("/getMyWorkouts", verify, workoutController.getMyWorkouts);

router.patch("/updateWorkout", verify, workoutController.updateWorkout);

router.delete("/deleteWorkout", verify, workoutController.deleteWorkout);

router.patch("/completeWorkoutStatus", verify, workoutController.completeWorkoutStatus);

module.exports = router;