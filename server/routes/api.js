const express = require('express');
const router = express.Router();

const tripController = require('../controllers/tripController');

router.get('/trips', tripController.getAllTrips, (req,res) => {
    res.status(200).send(res.locals.trips);
});

router.post('/trips', tripController.addTrip, tripController.addBags, (req,res) => {
    res.status(200).send(res.locals.newTrip);
});

router.get('/luggage/:id', tripController.getBag, (req,res) => {
    res.status(200).send(res.locals.items);
});

router.get('/trip/:id', tripController.getTripDetails, (req,res) => {
    res.status(200).send(res.locals.trip);
});

module.exports = router;
