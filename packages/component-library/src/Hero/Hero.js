import React from 'react';
import styles from './Hero.css';

const DefaultChildren = () => (
  <h1>Data for the people,<br />by the people.</h1>
);

const Hero = ({ children }) => (
  <div className={styles.hero}>
    <div className={styles.container}>
      <div className={styles.content}>
        {children || <DefaultChildren />}
      </div>
    </div>
  </div>
);

Hero.displayName = 'Hero';

Hero.propTypes = {
  children: React.PropTypes.node,
};

export default Hero;
