import React, { useState } from 'react';
import axios from 'axios';
import { Link, redirect } from 'react-router-dom';

export default function CreateTrip() {
  const [bags, setBags] = useState(0);
  const [tripName, setTripName] = useState("");
  const [selected, setSelected] = useState("Day Trip");

  async function createNewTrip() {
    await axios.post('/api/trips', {
      name: tripName,
      duration: selected,
      bags: bags
    })
  }
  return (
    <div>
      {/* Define Name of Trip */}
      <input onChange={(e) => setTripName(e.target.value)} value={tripName} />
      {/* Select Trip Duration */}
      <select onChange={e => setSelected(e.target.value)}>
        <option value='Day Trip'>Day Trip</option>
        <option value='Two Day Trip'>Two Day Trip</option>
        <option value='Weekend Trip'>Weekend Trip</option>
        <option value='1 Week Trip'>1 Week Trip</option>
        <option value='Long Vacation'>Long Vacation</option>
      </select>

      {/* Select Number of Bags */}
      <label htmlFor='bags'>Bags</label>
      <button
        onClick={() => {
          if (bags) setBags(bags - 1);
        }}
      >
        -
      </button>
      <span name='bags' id='bags'>
        {bags}
      </span>
      <button onClick={() => setBags(bags + 1)}>+</button>

      {/* Create New Trip */}
      <Link to='/'>
        <button onClick={createNewTrip}>Create New Trip</button>
      </Link>
    </div>
  );
}
