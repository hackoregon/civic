import React, { PropTypes } from 'react';
import { Button } from '@hackoregon/component-library';

const Footer = ({ next, back }) => (
  <div className="button-container">
    <Button onClick={e => back(e)}>
      Back
    </Button>
    <Button onClick={e => next(e)}>
      Next
    </Button>
  </div>
);

Footer.propTypes = {
  next: PropTypes.func.isRequired,
  back: PropTypes.func.isRequired,
};

export default Footer;
