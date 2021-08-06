const router = require("express").Router();
const Transaction = require("../models");

// Get all workouts
router.get("api/workouts", (req, res) => {
    db.Workout.find({})
    .then(dbWorkout => {
        res.json(dbWorkout)
    })
    .catch(err => {
        res.status(400).json(err);
    });
});