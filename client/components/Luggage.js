import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Item from "./Item";
import { useParams } from 'react-router-dom';

export default function Luggage() {
    let { luggageId } = useParams();
    const [items, setItems] = useState([]);

    useEffect(() => {
        const getItems = async () => {
            // use params id
            const itemsData = await axios.get(`/api/luggage/${luggageId}`)
            setItems(itemsData.data)
        }
        getItems();
    },[])
    return (
        <div>
            This is the single luggage page
            {items.map(item => <li>item</li>)}
        </div>
    )    
};
