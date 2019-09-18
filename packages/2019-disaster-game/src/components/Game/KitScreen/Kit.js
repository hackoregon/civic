/** @jsx jsx */
import { useState, useEffect } from "react";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import { map } from "lodash";
import { jsx, css } from "@emotion/core";
import { getItems } from "../../../state/kit";
import KitItem from "./KitItem";

const containerStyle = css`
  display: flex;
  flex-direction: column-reverse;
  width: 100vw;
  padding-top: 100px;
  transform: translateX(+100%);
  transition: transform 1s;
`;

const onScreenStyle = css`
  transform: translateX(0%);
`;

const kitStyle = css`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

function createKit(currentKit) {
  const items = [];

  map(currentKit, item => {
    if (item.goodKitItem) {
      items.push(
        <KitItem
          emptySvg={item.emptySvg}
          fullSvg={item.fullSvg}
          itemType={item.id}
          key={item.id}
        />
      );
    }
  });

  return <div css={kitStyle}>{items}</div>;
}

const KitScreen = ({ currentKit }) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(true);
  }, []);

  const kit = createKit(currentKit);

  return (
    <div
      css={css`
        ${containerStyle};
        ${open && onScreenStyle}
      `}
    >
      {kit}
    </div>
  );
};

KitScreen.propTypes = {
  currentKit: PropTypes.shape({})
};

export default connect(state => ({
  currentKit: getItems(state)
}))(KitScreen);
