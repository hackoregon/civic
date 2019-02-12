import React from 'react'; 
import { styles } from './storyStyles.js';

const TheBrandStyle = () => (
  <div style={styles.main}>

    <h1 style={styles.h1}>Welcome to the CIVIC Brand</h1>
    <p style={styles.p}>All of us connected to the Civic platform are the Brand. The logo, colors, typography, etc is all
    meant as shorthand for expressing our intent and values.</p>
    <h2 style={styles.h2}>Values</h2>
    <ul style={styles.ul}>
        <li>Data for the People by the People</li>
        <li>Story over Framework</li>
        <li>Usable over Pretty</li>
        <li>Neutrality over Partisanship</li>
        <li>Inclusion over Specificity</li>
        <li>Clarity over Saturation</li>
    </ul>
    <p style={styles.p}>
      Our Storybook is iterative and will be updated as the CIVIC Platform continues to grow.  Please reach out to us in the SLACK #product_design channel with any questions about usage or suggestions for improving the stories.
    </p>
    
  </div>
);

export default TheBrandStyle;