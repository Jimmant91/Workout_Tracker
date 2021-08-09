const router = require("express").Router();
const db = require("../models");

// Get all workouts
router.get("/api/workouts", (req, res) => {
    db.Workout.find({})
    .then(dbWorkout => {
        res.json(dbWorkout)
    })
    .catch(err => {
        res.status(400).json(err);
    });
});


//Enter new workout
router.post("/api/workouts", ({ body }, res) => {
    db.Workout.create(body)
    .then(dbWorkout => {
        res.json(dbWorkout);
    })
    .catch(err => {
        res.status(400).json(err);
    });
});

//Continue(update) workout
router.put('/api/workout/:id', (req, res) => {
    db.Workout.findByIdAndUpdate(
        { _id: req.params.id },
        { $push: { exercises: req.body } },
        { new: true, runValidators: true }
    )
    .then(dbWorkout => {
        res.json(dbWorkout);
    })
    .catch(err => {
        res.status(400).json(err);
    });
});

//GET workouts with aggregate/setting new field called totalDuration
router.get("/api/workouts", (req, res) => {
    db.Workout.aggregate([{
        //Adding the total duration
        $addFields: {totalDuration: {$sum: "$exercises.duration"}}
    }])
    .then(dbWorkout => {
        res.json(dbWorkout)
    })
    .catch(err => {
        res.status(400).json(err);
    });
});


module.exports = router;