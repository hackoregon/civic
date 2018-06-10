import React from 'react';
import { Link } from 'react-router';

const PortlandCollectionPage = () => (
  <div>
    <h1>Portland Collection. Fancier Page Coming Soon</h1>
    <ul>
      <li><Link to="/cities/portland/disaster">Disaster Resilience</Link></li>
      <li><Link to="/cities/portland/elections">Local Elections</Link></li>
      <li><Link to="/cities/portland/housing">Housing Affordability</Link></li>
      <li><Link to="/cities/portland/neighborhood">Neighborhood Development</Link></li>
      <li><Link to="/cities/portland/transportation">Transportation Systems</Link></li>
    </ul>
  </div>
);

PortlandCollectionPage.displayName = 'PortlandCollectionPage';

export default PortlandCollectionPage;
