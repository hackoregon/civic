import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const StoryLink = ({ children, icon, route, action }) => (
  route
    ? <div><Link to={route}><i className={icon} /><span>{children}</span></Link></div>
    : <div><a onClick={action}><i className={icon} /><span>{children}</span></a></div>
);


StoryLink.displayName = 'StoryLink';
StoryLink.propTypes = {
  action: PropTypes.func,
  children: PropTypes.node,
  icon: PropTypes.string,
  route: PropTypes.string,
};

export default StoryLink;
