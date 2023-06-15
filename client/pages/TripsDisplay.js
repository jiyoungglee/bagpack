import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, Outlet } from 'react-router-dom';

export default function TripsDisplay() {
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    const getTrips = async () => {
      const tripData = await axios.get('/api/trips');
      setTrips(tripData.data);
      console.log(tripData.data)
    };
    getTrips();
  }, []);

  return (
    <div className="root-page">
      <div className="sidebar">
        {trips.map((trip) => {
          return (
            <Link to={`trips/${trip._id}`}>
                <div className="trip-card" key={trip._id}>
                  <div className="trip-name">{trip.name}</div>
                  <div className="trip-tags">{trip.duration}</div>
                </div>
            </Link>
          )
        })}
      </div>
      <div className="bag-view">
        <Outlet />
      </div>
    </div>
  );
}
