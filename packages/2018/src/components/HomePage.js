import React from 'react';
import { Link } from 'react-router';

const HomePage = () => (
  <ul>
    <li><Link to="/disaster">Disaster Resilience</Link></li>
    <li><Link to="/elections">Local Elections</Link></li>
    <li><Link to="/housing">Housing Affordability</Link></li>
    <li><Link to="/neighborhood">Neighborhood Development</Link></li>
    <li><Link to="/transportation">Transportation Systems</Link></li>
  </ul>
);

HomePage.displayName = 'HomePage';

export default HomePage;
