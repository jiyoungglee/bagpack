const express = require('express');
const router = express.Router();

const tripController = require('../controllers/tripController');

router.post('/bags', tripController.addTrip, tripController.addBags, (req,res) => {
    res.status(200).send(res.locals.newTrip);
});

module.exports = router;
