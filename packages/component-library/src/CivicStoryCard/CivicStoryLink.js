import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { css } from 'emotion';

const storyLinkClass = css`
  & a {
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    justify-content: space-between;
    padding: 8px 12px;
    border-bottom: none;
    color: #000;

    &:hover {
      background-color: rgba(0,0,0,0.1);
      color: #000;
    }

    & i {
      margin-right: 12px;
      opacity: 0.8;
    }
  }

  & span {
    flex-wrap: nowrap;
  }
`;

const StoryLink = ({ children, icon, route, action }) => (
  <div className={storyLinkClass}>
    {route
      ? <Link to={route}><i className={icon} /><span>{children}</span></Link>
      : <a tabIndex="0" onClick={action}><i className={icon} /><span>{children}</span></a>
    }
  </div>
);


StoryLink.displayName = 'StoryLink';
StoryLink.propTypes = {
  action: PropTypes.func,
  children: PropTypes.node,
  icon: PropTypes.string,
  route: PropTypes.string,
};

export default StoryLink;
