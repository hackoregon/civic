/** @jsx jsx */
import { Component } from "react";
import { css, jsx } from "@emotion/core";
import { PropTypes } from "prop-types";

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
  state = {
    filledItem: false
  };

  fillKitItem = () => {
    this.setState({ filledItem: true });
  };

  render() {
    const { emptySvg, fullSvg } = this.props;
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
      <div css={ImagesContainer} onClick={this.fillKitItem}>
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
  fullSvg: PropTypes.node
};

export default KitItem;
