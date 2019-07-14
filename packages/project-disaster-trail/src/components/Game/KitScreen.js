/** @jsx jsx */
import { map } from "lodash";
import { jsx, css } from "@emotion/core";
import { MINIMUM_KIT as minimumKit } from "../../constants/items";
import KitItem from "./KitItem";

const kitStyle = css`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const KitScreen = () => {
  const items = [];

  map(minimumKit, item => {
    for (let i = 0; i < item.quantity; i+=1) {
      items.push(
        <KitItem
          emptySvg={item.emptySvg}
          fullSvg={item.fullSvg}
          key={`${item.id}_${i}`}
        />
      );
    }
  });

  return <div css={kitStyle}>{items}</div>;
};

export default KitScreen;
