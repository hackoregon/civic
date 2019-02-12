import React from 'react'; 
import { styles } from './storyStyles.js';

const Introduction = () => (
  <div style={styles.main}>

    <h1 style={styles.h1}>Introduction to CIVIC's Storybook</h1>
    <p style={styles.p}>Our Storybook shows how to use the CIVIC platform.</p>
    <p style={styles.p}>It has a style guide and the platform components.</p>
    <p style={styles.p}>Contributions to the CIVIC platform are welcome.</p>

    <h2 style={styles.h2}>Development</h2>
    <p style={styles.p}>
      Component stories are in the <code style={styles.code}>/stories</code> directory.  They show a state of one or more UI components.  (Basically a story is like a visual test case.)
    </p>
    <p style={styles.p}>
      See these sample <a style={styles.link} href="#" onClick={this.showApp}>stories</a> for a component called <code style={styles.code}>Button</code>.
    </p>
    <p style={styles.p}>
      You can add your own components as stories.  You can also edit those components and see changes right away.  Try editing the <code style={styles.code}>Button</code> component.
    </p>
    <p style={styles.p}>
      Our Storybook is iterative and will be updated as the CIVIC Platform continues to grow.  Please reach out to us in the SLACK #product_design channel with any questions about usage or suggestions for improving the stories.
    </p>
   
  </div>
);

export default Introduction;