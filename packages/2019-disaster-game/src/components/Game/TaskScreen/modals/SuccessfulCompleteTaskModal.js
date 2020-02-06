/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { palette } from "../../../../constants/style";
import { getActiveTask } from "../../../../state/tasks";
import { getItems } from "../../../../state/kit";

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
  align-items: center;
`;

const textStyle = css`
  font-weight: bold;
  font-size: 7em;
  line-height: 1.3em;
  font-family: "Akkurat", sans-serif;
  color: ${palette.darkGrey};
  margin: 0;
`;

const imgStyle = css`
  height: 490px;
`;

const SuccessfulCompleteTaskModal = ({ completedTask, allItems }) => {
  const { requiredItem } = completedTask;
  const requiredItemData = allItems[requiredItem];
  const { people, pets } = completedTask.completedResults;

  return (
    <div css={modalContainer}>
      <div css={messageStyle}>
        <p css={textStyle}>
          You helped
          {people ? (
            <span>
              {" "}
              {people}&nbsp;{people > 1 ? "people" : "person"}
            </span>
          ) : (
            ""
          )}
          {people && pets ? " and " : ""}
          {pets ? (
            <span>
              {" "}
              {pets}&nbsp;pet{pets > 1 ? "s" : ""}
            </span>
          ) : (
            ""
          )}
          <span> by using {requiredItemData.itemTitle}.</span>
        </p>
        <img
          css={imgStyle}
          src={requiredItemData.fullSvg}
          alt={requiredItemData.imgAlt}
        />
      </div>
    </div>
  );
};

SuccessfulCompleteTaskModal.propTypes = {
  completedTask: PropTypes.shape({
    requiredItem: PropTypes.string
  }),
  allItems: PropTypes.shape({})
};

const mapStateToProps = state => ({
  completedTask: getActiveTask(state),
  allItems: getItems(state)
});

export default connect(mapStateToProps)(SuccessfulCompleteTaskModal);
