import React, { memo } from "react";
import { PropTypes } from "prop-types";

import { connect } from "react-redux";
import styled from "@emotion/styled";

import { getActiveChapterIndex } from "../../../state/chapters";
import { palette } from "../../../constants/style";

const LevelContainer = styled.div`
  display: grid;
  align-items: center;
  height: 100%;
  margin-top: 20px;
  padding: 20px;
  background: ${palette.white};
  border-radius: 150px;
  text-align: center;
  /* Just guessing here as shadow is baked into raster in comp */
  box-shadow: 10px 10px 10px 0px rgba(0, 0, 0, 0.15);

  h2 {
    margin: 0;
    font-family: "Boogaloo", cursive;
    font-size: 10rem;
    color: ${palette.blue};
  }

  .red {
    color: ${palette.red};
  }
`;

const LevelView = ({ activeChapterIndex }) => (
  <LevelContainer>
    <h2>
      Level <span className="red">{activeChapterIndex}</span>
    </h2>
  </LevelContainer>
);

LevelView.propTypes = {
  activeChapterIndex: PropTypes.number
};

const mapStateToProps = state => ({
  activeChapterIndex: getActiveChapterIndex(state)
});

export default connect(mapStateToProps)(memo(LevelView));
