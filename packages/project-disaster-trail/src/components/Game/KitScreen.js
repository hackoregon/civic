/** @jsx jsx */
import { Fragment } from "react";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import { map } from "lodash";
import { jsx, css } from "@emotion/core";
import { getKitsNecessary, getItems } from "../../state/kit";
import KitItem from "./KitItem";

const kitStyle = css`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

function createKit(kitIndex, currentKit) {
  const items = [];

  map(currentKit, item => {
    items.push(
      <KitItem
        emptySvg={item.emptySvg}
        fullSvg={item.fullSvg}
        itemType={item.id}
        key={`${item.id}_${kitIndex}`}
        kitNumber={kitIndex}
        kitsFilledByItem={item.kitsFilledByItem}
      />
    );
  });

  return (
    <div css={kitStyle} key={kitIndex}>
      {items}
    </div>
  );
}

const KitScreen = ({ kitsNecessary, currentKit }) => {
  const kits = [];

  for (let i = 0; i < kitsNecessary; i += 1) {
    const newKit = createKit(i + 1, currentKit);
    kits.push(newKit);
  }

  return <Fragment>{kits}</Fragment>;
};

KitScreen.propTypes = {
  kitsNecessary: PropTypes.number,
  currentKit: PropTypes.shape({})
};

export default connect(state => ({
  kitsNecessary: getKitsNecessary(state),
  currentKit: getItems(state)
}))(KitScreen);
