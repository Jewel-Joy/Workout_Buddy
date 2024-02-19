const express=require('express');
const router=express.Router();
const {getWorkout,getSingleWorkout,createWorkout,deleteWorkout,updateWorkout}=require('../Controller/workoutController');

router.get('/',getWorkout)

router.get('/:id',getSingleWorkout)

router.post('/',createWorkout)

router.delete('/:id',deleteWorkout)

router.patch('/:id',updateWorkout)


module.exports=router;