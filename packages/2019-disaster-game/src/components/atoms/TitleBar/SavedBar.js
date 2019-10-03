/** @jsx jsx */
import { css, jsx } from "@emotion/core";
// import PropTypes from "prop-types";
// import { connect } from "react-redux";
// import { memo, useState, useEffect, useCallback } from "react";

import { palette } from "../../../constants/style";

const containerStyle = css`
  height: 175px;
  width: 700px;
  background-color: ${palette.lemon};
  display: grid;
  grid-template-columns: repeat(3, auto);
  padding: 0 80px;
  border-radius: 80px;
  align-content: center;
  justify-content: space-between;
`;

// const sectionStyle = css`
//   display: grid;
//   grid-template-columns: repeat(2, auto);
//   align-items: center;

//   > p {
//     font-family: "Luckiest Guy", sans-serif;
//     font-size: 5.5rem;
//     line-height: 100px;
//     color: ${palette.yellow};
//     // For some reason, <p/> won't align center and using just one of these methods doesn't work
//     margin: 0 0 -10px;
//     padding-top: 10px;
//   }
// `;

const headerStyle = css`
  font-family: "Luckiest Guy", sans-serif;
  font-size: 4rem;
  line-height: initial;
  color: ${palette.blue};
  margin: 0;
  padding-top: 15px;
`;

const labelStyle = css`
  font-family: "Boogaloo", sans-serif;
  font-size: 4rem;
  color: ${palette.blue};
  margin: 0;
  line-height: 130px;
  vertical-align: middle;
`;

const savedNumber = css`
  font-family: "Boogaloo", sans-serif;
  font-size: 4.5rem;
  color: ${palette.red};
`;

const SavedBar = () => {
  return (
    <div css={containerStyle}>
      <p css={headerStyle}>
        You
        <br />
        Saved
      </p>
      <p css={labelStyle}>
        People <span css={savedNumber}>234</span>
      </p>
      <p css={labelStyle}>
        Pets <span css={savedNumber}>00</span>
      </p>
    </div>
  );
};

export default SavedBar;

// SavedBar.propTypes = {};

// const mapStateToProps = state => ({});

// export default connect(mapStateToProps)(memo(SavedBar));
