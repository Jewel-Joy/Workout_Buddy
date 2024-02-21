const Workout=require('../Models/Workoutmodel');
const mongoose=require('mongoose');


const getWorkout=async(req,res)=>{
    const workout=await Workout.find().sort({createdAt:-1});
    res.status(200).json(workout);
}

const getSingleWorkout=async(req,res)=>{
    const{ id }=req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({message:`No workout with id:${id}`});
    }
    const workout=await Workout.findById(id);
    if(!workout){
        return res.status(404).json({message:`No workout with id:${id}`});
    }
    res.status(200).json(workout);
}

const createWorkout=async(req,res)=>{
    const{title,reps,load}=req.body;

    let emptyFields=[];
    if(!title) emptyFields.push('title');
    if(!reps) emptyFields.push('reps');
    if(!load) emptyFields.push('load');
    if(emptyFields.length>0){
        return res.status(400).json({error:'Please fill in the following fields',emptyFields});
    }
    try{
        
        const workout=await Workout.create({title,reps,load})
        res.status(200).json(workout);
}
catch (err) {
    res.status(400).json({ message: 'Error in creating workout', error: err.message });
}
}

const deleteWorkout=async(req,res)=>{
    const {id}=req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({message:`No workout with id:${id}`});
    }
    const workout=await Workout.findByIdAndDelete({_id:id})
    if(!workout){
        return res.status(404).json({message:`No workout with id:${id}`});
    }
    return res.status(200).json({message:'Workout deleted successfully'});
}

const updateWorkout=async(req,res)=>{
    const {id}=req.params;
    
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({message:`No workout with id:${id}`});
    }
    const workout=await Workout.findByIdAndUpdate({_id:id},{
        ...req.body
    })
    if(!workout){
        return res.status(404).json({message:`No workout with id:${id}`});
    }
    res.status(200).json(workout);
}

module.exports={getWorkout,getSingleWorkout,createWorkout,deleteWorkout,updateWorkout}