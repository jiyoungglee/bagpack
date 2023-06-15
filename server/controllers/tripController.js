const Trip = require('../models/tripModel');
const Bag = require('../models/bagModel');

const tripController = {};

tripController.getAllTrips = async (req, res, next) => {
  try {
    const trips = await Trip.find({ }, 'name duration');

    res.locals.trips = trips;

    return next();
  } catch (err) {
    return next({
      log: 'getAllTrips Error',
      message: { err: 'No Trips Found' },
    });
  }
};

tripController.addTrip = async (req, res, next) => {
  try {
    const {name, duration} = req.body;
    const newTrip = await Trip.create({ name, duration });
    res.locals.tripId = newTrip._id;

    return next();
  } catch (err) {
    return next({ log: 'addTrip Error', message: { err: 'Trip not added' } });
  }
};

tripController.addBags = async (req, res, next) => {
  try {
    // array of length number of bags with empty items array
    const bags = new Array(req.body.bags).fill({ items: [] });
    // add new bags to bag collection, return array of Bags
    const newBags = await Bag.insertMany(bags);

    const added = await Trip.findByIdAndUpdate(
      res.locals.tripId,
      {
        $push: {
          bags: {
            $each: newBags.map((bag) => bag._id),
          },
        },
      },
      { new: true }
    );

    res.locals.newTrip = added;
    return next();
  } catch (err) {
    return next({ log: err, message: { err: 'Bags not added' } });
  }
};

// tripController.getBags = async (req, res, next) => {
//   try {
//     const bags = await Trip.bags({});

//     res.locals.trips = trips;

//     return next();
//   } catch (err) {
//     return next({ log: 'getAllTrips Error', message: { err: 'No Trips Found' } });
//   }
// };

tripController.getBag = async (req, res, next) => {
  try {
    const bag = await Bag.findById(req.params.id);
    res.locals.items = bag.items;
    next();
  } catch (err) {
    return next({ log: err, message: { err: 'Bags not found' } });
  }
};

tripController.getTripDetails = async (req, res, next) => {
  try {
    const trip = await Trip.findById(req.params.id);
    res.locals.trip = trip;
    return next();
  } catch (err) {
    return next({ log: err, message: { err: 'Trip not found' } });
  }
};

module.exports = tripController;
