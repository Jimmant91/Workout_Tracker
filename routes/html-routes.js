const router = require('express').Router(); 
const path = require('path');

//Route for base page
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

// Route for exercise entry page
router.get("/exercise", (req, res) => res.sendFile(path.join(__dirname, "../public/exercise.html")));

module.exports = router;