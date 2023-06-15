import React from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Luggage from './components/Luggage';
import CreateTrip from './pages/CreateTrip';
import TripsDisplay from './pages/TripsDisplay';
import Trip from './components/Trip';
import './styles.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <TripsDisplay />,
    children: [
      {
        path: 'trips/:tripId',
        element: <Trip />,
      },
    ],
  },
  {
    path: '/create-trip',
    element: <CreateTrip />,
  },
  {
    path: '/luggage/:luggageId',
    element: <Luggage />,
  },
]);

const root = createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
