/** @jsx jsx */
import { Component } from "react";
import { connect } from "react-redux";
import { css, jsx } from "@emotion/core";
import { PropTypes } from "prop-types";
import { addItem } from "../../state/kit";

const ImagesContainer = css`
  position: relative;
  width: 100px;
  height: 100px;
`;

const KitItemStyle = css`
  display: block;
  width: 100px;
  height: 100px;
  position: absolute;
`;

class KitItem extends Component {
  constructor(props) {
    super(props);

    const shouldBeFilled = this.shouldBeFilled();

    this.state = {
      filledItem: shouldBeFilled
    };
  }

  componentDidUpdate(prevProps, prevState) {
    const { filledItem } = prevState;
    const shouldBeFilled = this.shouldBeFilled();

    if (shouldBeFilled && !filledItem) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({ filledItem: true });
    }
  }

  shouldBeFilled = () => {
    const { kitsFilledByItem, kitNumber } = this.props;
    return kitsFilledByItem >= kitNumber;
  };

  render() {
    const { emptySvg, fullSvg, onAddKitItem, itemType } = this.props;
    const { filledItem } = this.state;

    const EmptyKitItem = css`
      background-image: url(${emptySvg});
      background-size: cover;
      opacity: 1;
      transition: all 1s ease;

      &.filled-item {
        opacity: 0;
      }
    `;

    const ColorKitItem = css`
      background-image: url(${fullSvg});
      background-size: cover;
      opacity: 0;
      transition: all 1s ease;

      &.filled-item {
        opacity: 1;
      }
    `;

    /* eslint-disable jsx-a11y/click-events-have-key-events */
    /* eslint-disable jsx-a11y/no-static-element-interactions */
    return (
      <div
        css={ImagesContainer}
        onClick={() => {
          onAddKitItem(itemType);
        }}
      >
        <div
          css={css`
            ${KitItemStyle};
            ${EmptyKitItem}
          `}
          className={filledItem ? "filled-item" : ""}
        />
        <div
          css={css`
            ${KitItemStyle};
            ${ColorKitItem}
          `}
          className={filledItem ? "filled-item" : ""}
        />
      </div>
    );
    /* eslint-enable jsx-a11y/click-events-have-key-events */
    /* eslint-enable jsx-a11y/no-static-element-interactions */
  }
}

KitItem.propTypes = {
  emptySvg: PropTypes.node,
  fullSvg: PropTypes.node,
  itemType: PropTypes.string,
  kitsFilledByItem: PropTypes.number,
  kitNumber: PropTypes.number,
  onAddKitItem: PropTypes.func
};

// Temporarily addItem from this component, will be orbs later
export default connect(
  null,
  dispatch => ({
    onAddKitItem(itemId) {
      dispatch(addItem(itemId));
    }
  })
)(KitItem);
