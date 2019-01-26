import React from 'react';  
import { styles } from './storyStyles.js';

const Welcome = () => (
  <div style={styles.main}>
    <h1 style={styles.h1}>Welcome to Hack Oregon&apos;s Storybook</h1>
    <p style={styles.p}>
      This is a UI component dev environment for the component library.
    </p>
    <p style={styles.p}>
      Stories originate from the <code style={styles.code}>/stories</code> directory.
      <br />
      A story is a state of one or more UI components.
      <br />
      (Basically a story is like a visual test case.)
    </p>
    <p style={styles.p}>
      See these sample <a style={styles.link} href="#" onClick={this.showApp}>stories</a> for a component called <code style={styles.code}>Button</code>.
    </p>
    <p style={styles.p}>
      Just like that, you can add your own components as stories.
      <br />
      You can also edit those components and see changes right away.
      <br />
      (Try editing the <code style={styles.code}>Button</code> component
      located at <code style={styles.code}>src/stories/Button.js</code>.)
    </p>
  </div>
);

export default Welcome;