import PropTypes from "prop-types";
import { Link } from "react-router";
/** @jsx jsx */
import { jsx, css } from "@emotion/core";

const linkClass = css`
  & > a {
    color: rgba(255, 255, 255, 0.65);
    flex: 1;
    display: block;
    font-family: "Rubik", sans-serif;
    font-size: 1.25rem;
    border: none;
    text-transform: uppercase;
    text-decoration: none;
    padding: 1rem;
    text-align: center;

    &:focus,
    &:hover,
    &:active {
      color: rgba(255, 255, 255, 0.85);
    }

    &:hover {
      text-decoration: none;
    }
  }
`;

const pathOrName = (p, n) => p || `/${n.toLowerCase()}`;

const NavRouterLink = ({ path, customStyles, name }) => {
  const boxStyle = customStyles ? customStyles.box : null;
  const linkStyle = customStyles ? customStyles.link : null;
  const pathTo = pathOrName(path, name);

  return (
    <li css={linkClass} style={{ ...boxStyle }}>
      <Link className="nav-item" to={pathTo}>
        <span style={{ ...linkStyle }}>{name}</span>
      </Link>
    </li>
  );
};

NavRouterLink.propTypes = {
  name: PropTypes.string,
  path: PropTypes.string,
  customStyles: PropTypes.shape({})
};

export default NavRouterLink;
