/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import questionOrb from "../../../../assets/kit_icons/question-orb.svg";
import { getItems } from "../../../state/kit";

const kitItemStyle = css`
  display: block;
  width: 300px;
  height: 300px;
  background-repeat: no-repeat;
  background-size: cover;
  transition: background-image 1s;
`;

const orbsList = numberRequiredItems => css`
  position: absolute;
  bottom: 0;
  display: grid;
  grid-template-columns: repeat(${numberRequiredItems}, auto);
  grid-column-gap: 50px;
  padding: 0 0 50px 50px;
`;

// eslint-disable-next-line react/prop-types
const ItemOrb = ({ index, correctItemsChosen, requiredItemSVG }) => {
  return (
    <div
      alt="unknown kit item"
      css={css`
        ${kitItemStyle};
        background-image: url("${
          index < correctItemsChosen ? requiredItemSVG : questionOrb
        }");
      `}
    />
  );
};

const RequiredItemsOrbs = ({
  numberRequiredItems,
  correctItemsChosen,
  requiredItem,
  possibleItems
}) => {
  const orbs = [];
  const requiredItemSVG = possibleItems[requiredItem].fullSvg;

  for (let i = 0; i < numberRequiredItems; i += 1) {
    orbs.push(
      <ItemOrb
        index={i}
        correctItemsChosen={correctItemsChosen}
        requiredItemSVG={requiredItemSVG}
        key={`${requiredItem}_${i}`}
      />
    );
  }

  return (
    <div css={orbsList(numberRequiredItems)}>
      {orbs.map(orb => {
        return orb;
      })}
    </div>
  );
};

RequiredItemsOrbs.propTypes = {
  numberRequiredItems: PropTypes.number,
  correctItemsChosen: PropTypes.number,
  requiredItem: PropTypes.string,
  possibleItems: PropTypes.shape({})
};

const mapStateToProps = state => ({
  possibleItems: getItems(state)
});

export default connect(mapStateToProps)(RequiredItemsOrbs);
