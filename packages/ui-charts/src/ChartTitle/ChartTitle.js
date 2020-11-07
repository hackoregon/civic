/* eslint-disable import/prefer-default-export */
import PropTypes from "prop-types";
/** @jsx jsx */
import { jsx, css } from "@emotion/core";

const titleStyle = css`
  display: block;
  font-family: "Roboto Condensed", "Helvetica Neue", Helvetica, sans-serif;
  font-size: 21px;
  font-weight: bold;
  text-align: center;
  margin: 0;

  @media (max-width: 640px) {
    text-align: left;
  }
`;

const subtitleStyle = css`
  display: block;
  font-family: "Roboto Condensed", "Helvetica Neue", Helvetica, sans-serif;
  font-size: 14px;
  text-align: center;
  margin: 10px 0;

  @media (max-width: 640px) {
    text-align: left;
  }
`;

export const ChartTitle = ({ title, subtitle }) =>
  title || subtitle ? (
    <figcaption>
      {title ? <h2 css={titleStyle}>{title}</h2> : null}
      {subtitle ? <h3 css={subtitleStyle}>{subtitle}</h3> : null}
    </figcaption>
  ) : null;

ChartTitle.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string
};

ChartTitle.defaultProps = {};

ChartTitle.displayName = "ChartTitle";
