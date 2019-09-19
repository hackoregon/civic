/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import { Link } from "react-router";
import { startCase } from "lodash";

const projectContentContainer = css`
  position: relative;
  &:focus-within {
    box-shadow: 0px 2px 6px 0px rgba(0, 0, 0, 0.2),
      0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 4px 2px -1px rgba(0, 0, 0, 0.12);
    outline: 1px solid transparent; /* needed for Windows high-contrast mode */
  }
`;

const cardHeadlineLink = css`
  display: inline-block;
  &::before {
    bottom: 0;
    content: "";
    left: 0;
    position: absolute;
    right: 0;
    top: 0;
  }
  &:focus-visible {
    outline: 2px solid hsl(300, 5%, 55%);
  }
  &:-moz-focusring {
    outline: 2px solid hsl(300, 5%, 55%);
  }
  &:hover {
    color: currentColor;
  }
`;

const watermarkContainer = css`
  position: absolute;
  left: 0;
  top: 0;
  z-index: 0;
  text-align: left;
`;

const scaleCorner = css`
  width: 5vw;
  min-width: 67px;
  max-width: 134px;
  height: 5vw;
  min-height: 67px;
  max-height: 134px;
`;

const nonInteractiveCta = css`
  font-family: Rubik, Helvetica Neue, Helvetica, sans-serif;
  font-size: 0.8125rem;
  font-weight: 500;
  line-height: 1.75;
  padding: 0.307692308em 0.615384615em;
  text-transform: uppercase;
  transition: background-color 63ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
    box-shadow 63ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
    border 63ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  z-index: 2;
  &:hover {
    background-color: rgba(32, 16, 36, 0.08);
    cursor: pointer;
  }
`;

const useProjectStyles = makeStyles({
  card: {
    "&:hover": {
      boxShadow:
        "0px 2px 6px 0px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 4px 2px -1px rgba(0,0,0,0.12)"
    }
  }
});

const Watermark = () => (
  <div css={watermarkContainer}>
    <svg aria-hidden="true" css={scaleCorner}>
      <g fill="none" fillRule="evenodd">
        <path d="M0 134.658V0l11.566 11.597v123.061H0z" fill="#191119" />
        <path
          d="M133.864 0v11.597H11.566v.008L0 .008V0h133.864z"
          fill="#DC4556"
        />
      </g>
    </svg>
  </div>
);

const types = {
  collection: { action: "View collection" },
  application: { action: "Check it out!" }
};

const ProjectCard = ({ title, description, link, type }) => {
  const classes = useProjectStyles();

  return (
    <Card css={projectContentContainer} className={classes.card}>
      <Watermark />
      <div
        css={css`
          padding: 0 0.9375rem 0 1.6875rem;
        `}
      >
        <CardContent>
          <h2>
            <Link css={cardHeadlineLink} to={link}>
              {startCase(type)}: {title}
            </Link>
          </h2>
          <p>{description}</p>
        </CardContent>
        <CardActions>
          <span css={nonInteractiveCta}>{types[type].action}</span>
        </CardActions>
      </div>
    </Card>
  );
};

ProjectCard.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  link: PropTypes.string,
  type: PropTypes.oneOf("collection", "application")
};

export default ProjectCard;
