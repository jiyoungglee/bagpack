const Trip = require('../models/tripModel');
const Bag = require('../models/bagModel');

const tripController = {};

tripController.addTrip = async (req, res, next) => {
  try {
    const newTrip = await Trip.create({ name: 'Test', duration: '3 days' });
    res.locals.tripId = newTrip._id;

    return next();
  } catch (err) {
    return next({ message: { err: 'addTrip Error' } });
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
    return next(err);
  }
};

module.exports = tripController;
