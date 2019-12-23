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
  grid-row-gap: 50px;
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
  height: 430px;
`;

const NeedRequiredItemModal = ({ activeTask, allItems }) => {
  const { requiredItem } = activeTask;
  const requiredItemData = allItems[requiredItem];

  return (
    <div css={modalContainer}>
      <div css={messageStyle}>
        <p css={textStyle}>
          Next time we should bring {requiredItemData.itemTitle}.
        </p>
        <img
          src={requiredItemData.fullSvg}
          alt="required item"
          css={imgStyle}
        />
      </div>
    </div>
  );
};

NeedRequiredItemModal.propTypes = {
  activeTask: PropTypes.shape({
    requiredItem: PropTypes.string
  }),
  allItems: PropTypes.shape({})
};

const mapStateToProps = state => ({
  activeTask: getActiveTask(state),
  allItems: getItems(state)
});

export default connect(mapStateToProps)(NeedRequiredItemModal);
