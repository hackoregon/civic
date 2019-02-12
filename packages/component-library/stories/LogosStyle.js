import React from 'react'; 
import { styles } from './storyStyles.js';
import Logo from '../src/Logo/LogoAnimated';


const invertTitle = "Quick Usage"

const LogosStyle = () => (
  <div style={styles.main}>

    <h1 style={styles.h1}>
      Logos
    </h1>
    <h2 style={styles.h2}>
      Quick Usage
    </h2>
    <p style={styles.p}>
      This quick usage guide should assist in using the appropriate logo version for most applications. Examples of each version in use follows. All Logos should carry the “Built by Hack Oregon” with the “Code Tree” except for special circumstances approved by Hack Oregon.
    </p>
    <h3 style={styles.h3}>
      Step 1: Select Orientation Type
    </h3>
    <p style={styles.p}>
      Select the appropriate orientation and size for the space in which the logo will appear.
    </p>
    <h4 style={styles.h4}>
      Stack
    </h4>
    <p style={styles.p}>
      Standard go-to Logo. Use in tall or square spaces.
    </p>
    <h4 style={styles.h4}>
      Wide
    </h4>
    <p style={styles.p}>
      Use in wide spaces such as headers or color bars.
    </p>
    <h4 style={styles.h4}>
      Logo
    </h4>
    <p style={styles.p}>
      Use only when standard “CIVIC” logo has already been used or in some primary brand content where “CIVIC” is already understood by the audience.
    </p>
    <h3 style={styles.h3}>Step 2: Select Color Version</h3>
    <p style={styles.p}>Select the appropriate color version for the background in which the logo will appear.</p>
    <h4 style={styles.h4}>
      Standard
    </h4>
    <p style={styles.p}>
      Standard go-to Logo. Use on light solid-color backgrounds.
    </p>
    <h4 style={styles.h4}>
      Invert
    </h4>
    <p style={styles.p}>
      Use on dark, solid-color backgrounds.
    </p>
    <p>
      <Logo alt={invertTitle} style={styles.invertLogo} />
    </p>
    <h4 style={styles.h4}>Single Color</h4>
    <p style={styles.p}>
      Use on multi-color or photographic backgrounds. Also useful for any other application where only one color can be used such as in printing. 
    </p>

    <h2 style={styles.h2}>
      Stack
    </h2>

    <h2 style={styles.h2}>
      Wide
    </h2>

    <h2 style={styles.h2}>
      Icon
    </h2>

  </div>
);

export default LogosStyle;