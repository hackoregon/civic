import PropTypes from "prop-types";
import { Link } from "react-router";
/** @jsx jsx */
import { jsx, css } from "@emotion/core";

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
      background-color: rgba(0, 0, 0, 0.1);
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

/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/click-events-have-key-events */
const StoryLink = ({ children, icon, route, action, link, embed }) => (
  <div css={storyLinkClass}>
    {route ? (
      <Link to={route}>
        <i aria-hidden="true" className={icon} />
        <span>{children}</span>
      </Link>
    ) : embed ? (
      <a href={link} target="_blank" rel="noopener noreferrer">
        <i aria-hidden="true" className={icon} />
        <span>{children}</span>
      </a>
    ) : link ? (
      <a href={link}>
        <i aria-hidden="true" className={icon} />
        <span>{children}</span>
      </a>
    ) : (
      <a tabIndex="0" onClick={action} role="button">
        <i aria-hidden="true" className={icon} />
        <span>{children}</span>
      </a>
    )}
  </div>
);
/* eslint-enable no-nested-ternary */
/* eslint-enable jsx-a11y/anchor-is-valid */
/* eslint-enable jsx-a11y/click-events-have-key-events */

StoryLink.displayName = "StoryLink";
StoryLink.propTypes = {
  action: PropTypes.func,
  children: PropTypes.node,
  icon: PropTypes.string,
  route: PropTypes.string,
  link: PropTypes.string,
  embed: PropTypes.bool
};

export default StoryLink;
