/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { useEffect, memo } from "react";
import { sample } from "lodash";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { palette } from "../../../constants/style";
import { TYPES as SFX_TYPES } from "../../../constants/sfx";
import {
  playAudio as _playAudio,
  stopAudio as _stopAudio
} from "../../../state/sfx";

const contentWrapper = css`
  height: 100vh;
  width: 100vw;
  z-index: 10;
  display: grid;
  justify-items: center;
  align-items: center;
`;

const contentTitle = css`
  font-family: "Boogaloo", sans-serif;
  font-size: 16rem;
  color: ${palette.salmon};
  text-align: center;
  margin: 0;
`;

const TasksIntro = ({ playAudio, stopAudio }) => {
  const instructionalAudio = sample([
    SFX_TYPES.LETS_PREPARE_GIRL,
    SFX_TYPES.LETS_PREPARE_BOY
  ]);

  useEffect(() => {
    playAudio(instructionalAudio);

    return () => {
      stopAudio(instructionalAudio);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div css={contentWrapper}>
      <p css={contentTitle}>Let&apos;s prepare for an earthquake</p>
    </div>
  );
};

TasksIntro.propTypes = {
  playAudio: PropTypes.func,
  stopAudio: PropTypes.func
};

const mapDispatchToProps = dispatch => ({
  playAudio: bindActionCreators(_playAudio, dispatch),
  stopAudio: bindActionCreators(_stopAudio, dispatch)
});

export default connect(
  null,
  mapDispatchToProps
)(memo(TasksIntro));
