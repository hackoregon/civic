import React from 'react'; 
import { styles } from './storyStyles.js';

const ThePlatformStyle = () => (
  <div style={styles.main}>
    <h1 style={styles.h1}>Welcome to the CIVIC Platform</h1>
    <p style={styles.p}>CIVIC is a radical new open data platform that enables engaged exploration of civic analytics. We make public information, public knowledge.</p>
    <p style={styles.p}>Powered by the People for the People.</p>
    <h2 style={styles.h2}>The Purpose</h2>
    <p style={styles.p}>The purpose of this product is to showcase the power of open data and to cultivate new prosperous relationships among Hack Oregon, community organizations and citizens alike.</p>
    <h2 style={styles.h2}>Values</h2>
    <ul style={styles.ul}>
        <li>Accessibility</li>
        <li>Accuracty</li>
        <li>Curiosity</li>
        <li>Discoverability</li>
        <li>Engagement</li>
        <li>Inclusion</li>
        <li>Speed</li>
        <li>Transparency</li>
        <li>Usability</li>
        <li>Utility</li>
        <li>Warmth</li>
    </ul>
    
  </div>
);

export default ThePlatformStyle;