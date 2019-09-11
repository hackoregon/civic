/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import { Link } from "react-router";

const sandboxContentContainer = css`
  position: relative;
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

const useSandboxStyles = makeStyles({
  card: {
    "&:hover": {
      boxShadow:
        "0px 2px 6px 0px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 4px 2px -1px rgba(0,0,0,0.12)"
    }
  }
});

const Watermark = () => (
  <div css={watermarkContainer}>
    <svg css={scaleCorner} xmlns="http://www.w3.org/2000/svg">
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

const SandboxCard = () => {
  const classes = useSandboxStyles();

  return (
    <Link to="/sandbox">
      <Card css={sandboxContentContainer} className={classes.card}>
        <Watermark />
        <div
          css={css`
            padding: 0 15px 0 27px;
          `}
        >
          <CardContent>
            <h2>Application: CIVIC Sandbox</h2>
            <p>
              A common resource that can power ethical data exploration through
              interactive maps
            </p>
          </CardContent>
          <CardActions>Check it out!</CardActions>
        </div>
      </Card>
    </Link>
  );
};

export default SandboxCard;
