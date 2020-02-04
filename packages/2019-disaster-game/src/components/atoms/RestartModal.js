/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { palette } from "../../constants/style";
import { playSFX as _playSFX } from "../../state/sfx";
import { TYPES as SFX_TYPES } from "../../constants/sfx";

const modalContainer = css`
  position: absolute;
  width: 100vw;
  height: 100vh;
  background-color: ${palette.modalBackgroundGrey};
  display: grid;
  align-content: center;
  justify-content: center;
  text-align: center;
  z-index: 900;
  opacity: 1;
  transition: all 1s;
`;

const messageStyle = css`
  background-color: ${palette.white};
  padding: 100px;
  border-radius: 50px;
  justify-items: center;
  display: grid;
  width: 45vw;
`;

const titleText = css`
  font-family: "Akkurat", sans-serif;
  font-size: 14rem;
  margin: 50px 0 0;
  color: ${palette.darkGrey};
  letter-spacing: 5px;
`;

const buttonContainer = css`
  display: grid;
  grid-template-columns: 1fr 1fr;
  justify-items: center;
  width: 80%;
  margin: 100px 0;
`;

const buttonStyle = css`
  width: 600px;
  height: 400px;
  display: grid;
  align-content: center;
  border-radius: 100%;
  border: none;
  cursor: pointer;
  outline: none;
`;

const restartButton = css`
  background-color: ${palette.red};
  box-shadow: 0px 50px 0px 0px ${palette.darkRed};

  &:active {
    background-color: ${palette.darkRed};
    box-shadow: 0px 50px 0px 0px ${palette.darkestRed};
  }
`;

const playButton = css`
  background-color: ${palette.lime};
  box-shadow: 0px 50px 0px 0px ${palette.darkLime};

  &:active {
    background-color: ${palette.darkLime};
    box-shadow: 0px 50px 0px 0px ${palette.darkestLime};
  }
`;

const buttonFont = css`
  width: 100%;
  margin: 0 auto;
  font-family: "Akkurat", sans-serif;
  font-size: 7rem;
  color: white;
`;

const RestartModal = ({ cancelRestart, restartGame, playSFX }) => {
  const doCancelRestart = () => {
    playSFX(SFX_TYPES.START_RECORD);
    cancelRestart();
  };

  const doRestartGame = () => {
    playSFX(SFX_TYPES.START_RECORD);
    restartGame();
  };

  return (
    <div css={modalContainer}>
      <div css={messageStyle}>
        <p css={titleText}>Still Playing?</p>
        <div css={buttonContainer}>
          <button
            onMouseDown={doRestartGame}
            onTouchStart={doRestartGame}
            onClick={doRestartGame}
            type="button"
            css={[buttonStyle, restartButton]}
          >
            <p css={buttonFont}>Start Over</p>
          </button>
          <button
            onMouseDown={doCancelRestart}
            onTouchStart={doCancelRestart}
            onClick={doCancelRestart}
            type="button"
            css={[buttonStyle, playButton]}
          >
            <p css={buttonFont}>Continue</p>
          </button>
        </div>
      </div>
    </div>
  );
};

RestartModal.propTypes = {
  cancelRestart: PropTypes.func,
  restartGame: PropTypes.func,
  playSFX: PropTypes.func
};

const mapDispatchToProps = dispatch => ({
  playSFX: bindActionCreators(_playSFX, dispatch)
});

export default connect(
  null,
  mapDispatchToProps
)(RestartModal);
