import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { css } from 'emotion';

const primaryColor = 'rgb(238, 73, 80)';
const storyLinkClass = css`
  border-bottom: 2px solid ${primaryColor};

  & a {
    display: flex;
    padding: 6px 8px 6px 6px;
    flex-wrap: nowrap;
    align-items: center;
    justify-content: space-between;
    border-bottom: none;

    &:hover {
      background-color: ${primaryColor};
      color: #fff;
    }

    &:focus {
      outline: none;
    }

    & i {
      margin-right: 12px;
    }
  }

  & span {
    flex-wrap: nowrap;
    transition: all 0.2s ease-in-out;
  }
`;

const StoryLink = ({ children, icon, route, action }) => (
  <div className={storyLinkClass}>
    {route ? (
      <Link to={route}>
        <i className={icon} />
        <span>{children}</span>
      </Link>
    ) : (
      <a tabIndex="0" onClick={action}>
        <i className={icon} />
        <span>{children}</span>
      </a>
    )}
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
