import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSuitcase } from '@fortawesome/free-solid-svg-icons';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function Trip() {
    let { tripId } = useParams();
    const [bags, setBags] = useState([]);
    const [details, setDetails] = useState({});
  
    // get bags
    useEffect(() => {
      const getTrip = async () => {
          // use params id
          const tripData = await axios.get(`/api/trip/${tripId}`)
          const { name, details, bags } = tripData.data;
          setBags(bags);
          setDetails({name, tags: details});
      }
      getTrip();
  },[])

 return (
    <div className="trip-card">
        <h1>This should include all bags for Trip ID</h1>
        <div className="trip-name">{details.name}</div>
        <div className="trip-tags">{details.tags}</div>
        <div className="bags">
            {bags.map(bag => {
                return (
                <Link to={`/luggage/${bag}`}>
                    <FontAwesomeIcon icon={faSuitcase} />
                </Link>
                )
            })}
        </div>
    </div>
 )
};
