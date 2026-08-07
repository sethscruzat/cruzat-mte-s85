const Workout = require("../models/Workout.js");
const {errorHandler} = require("../middleware/auth.js")

module.exports.addWorkout = async (req, res) =>{
    const {name, duration} = req.body
    try{

        if(!duration.includes("minutes".toLowerCase()) || 
        duration.includes("seconds".toLowerCase()) ||
        duration.includes("hours".toLowerCase())){
            return res.status(400).send({error: "Duration must include proper duration."})
        }

        const newWorkout = new Workout({
            userId: req.user.id,
            name: name,
            duration: duration.toLowerCase()
        })

        const response = await newWorkout.save();

        if(!response){
            return res.status(400).send({error: "Error when adding workout."})
        }

        return res.status(201).send(response)
    }catch(error){
        errorHandler(error, req, res);
    }
}

module.exports.getMyWorkouts = async (req, res) =>{
    try{
        const response = await Workout.find({userId: req.user.id})

        if(!response){
            return res.status(404).send({message: "No workouts found."})
        }

        return res.status(200).send({workouts: response})

    }catch(error){
        errorHandler(error, req, res);
    }
}

module.exports.updateWorkout = async (req, res) =>{
    try{

    }catch(error){
        errorHandler(error, req, res);
    }
}

module.exports.deleteWorkout = async (req, res) =>{
    try{

    }catch(error){
        errorHandler(error, req, res);
    }
}

module.exports.completeWorkoutStatus = async (req, res) =>{
    try{

    }catch(error){
        errorHandler(error, req, res);
    }
}