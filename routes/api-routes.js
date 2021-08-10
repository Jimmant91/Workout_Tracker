const router = require("express").Router();
const db = require("../models");

// Get all workouts
// router.get("/api/workouts", (req, res) => {
//     db.Workout.find({})
//     .then(dbWorkout => {
//         res.json(dbWorkout)
//     })
//     .catch(err => {
//         res.status(400).json(err);
//     });
// });


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
router.put('/api/workouts/:id', (req, res) => {
    db.Workout.findByIdAndUpdate(
        ( req.params.id ),
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

//Establishing aggregate to set new field called
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

//Using aggregate to GET the range of the last seven days
router.get("/api/workouts/range", (req, res) => {
    db.Workout.aggregate([
        {$addFields: {totalDuration: {$sum: "$exercises.duration"}}},
        //Sorting in descending order to start with most recent day
        {$sort: {"day": -1}},
        {$limit: (7)}
    ])
    .then(dbWorkout => {
        res.json(dbWorkout)
    })
    .catch(err => {
        res.status(400).json(err);
    });
});

module.exports = router;
