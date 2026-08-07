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
    const workoutId = req.params.id;
    const {name, duration} = req.body;

    try{
        const response = await Workout.findByIdAndUpdate(workoutId, {
            name: name,
            duration: duration
        }, {new: true});

        if(!response){
            return res.status(404).send({error: "Workout not found."})
        }

        return res.status(200).send({message: "Workout updated successfully", updatedWorkout: response})

    }catch(error){
        errorHandler(error, req, res);
    }
}

module.exports.deleteWorkout = async (req, res) =>{
    const workoutId = req.params.id;

    try{
        const workoutResponse = await Workout.findById(workoutId);

        if(!workoutResponse){
            return res.status(404).send({error: "Workout not found"})
        }

        const response = await Workout.findByIdAndDelete(workoutId);

        if(!response){
            return res.status(400).send({error: "Error when deleting workout."})
        }

        return res.status(200).send({message: "Workout deleted successfully"})
        

    }catch(error){
        errorHandler(error, req, res);
    }
}

module.exports.completeWorkoutStatus = async (req, res) =>{
    const workoutId = req.params.id;
    
    try{
        const workoutResponse = await Workout.findById(workoutId)

        if(!workoutResponse){
            return res.status(404).send({error: "Workout not found."})
        }        
        
        if (workoutResponse.status === "completed") {
            return res.status(200).send({message: "Workout already completed", workout: workoutResponse});
        }

        workoutResponse.status = "completed";
        const response = await workoutResponse.save();

        if(response){
            return res.status(200).send({message: "Workout status updated successfully", updatedWorkout: response})
        }
    }catch(error){
        errorHandler(error, req, res);
    }
}