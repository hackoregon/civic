import React, { PropTypes } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';

const Shell = ({ children, metaTags }) => (
  <div><Helmet {...metaTags} />
    {children}
  </div>
);

Shell.propTypes = {
  children: PropTypes.node.isRequired,
  metaTags: PropTypes.shape({}).isRequired,
};

export default connect(state => ({ metaTags: state.global.metaTags }))(Shell);
