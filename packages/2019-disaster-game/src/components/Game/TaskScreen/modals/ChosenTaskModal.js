/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { getActiveTask } from "../../../../state/tasks";
import { palette } from "../../../../constants/style";

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
  border-radius: 40px;
  justify-items: center;
  display: grid;
  width: 40vw;
  min-height: 40vh;
  display: grid;
  grid-row-gap: 50px;
  align-items: center;
`;

const textStyle = css`
  font-family: "Boogaloo", sans-serif;
  font-size: 9rem;
  line-height: 11rem;
  color: ${palette.darkGrey};
  margin: 0;
`;

const imgStyle = css`
  height: 390px;
`;

const taskLabel = css`
  font-family: "Boogaloo", sans-serif;
  color: ${palette.darkGrey};
  margin: 0;
  font-size: 6.75rem;
  line-height: 7rem;
  max-width: 400px;
  margin-top: 30px;
`;

const ChosenTaskModal = ({ chosenTask }) => (
  <div css={modalContainer}>
    <div css={messageStyle}>
      <p css={textStyle}>{chosenTask.callToAction}</p>
      <div>
        <img
          css={imgStyle}
          src={chosenTask.imageSVG}
          alt={chosenTask.imageAlt}
        />
        <p css={taskLabel}>{chosenTask.imageLabel}</p>
      </div>
    </div>
  </div>
);

ChosenTaskModal.propTypes = {
  chosenTask: PropTypes.shape({
    callToAction: PropTypes.string,
    imageSVG: PropTypes.string,
    imageAlt: PropTypes.string
  })
};

const mapStateToProps = state => ({
  chosenTask: getActiveTask(state)
});

export default connect(mapStateToProps)(ChosenTaskModal);
