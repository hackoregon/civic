import React, { PropTypes } from 'react';

const styles = {
  base: {
    textAlign: 'center',
  },
};

const StoryCard = ({ title, description, children }) => (
  <div style={styles.base}>
    <h2>{title}</h2>
    <p className={'Raleway'}>{description}</p>
    <div style={{ width: '100%' }}>
      {children}
    </div>
  </div>
  );

StoryCard.displayName = 'StoryCard';

StoryCard.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  children: PropTypes.node,
};

export default StoryCard;
