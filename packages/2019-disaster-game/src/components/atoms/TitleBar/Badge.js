/** @jsx jsx */
import { css, jsx } from "@emotion/core";

import EmptyBadgeSVG from "../../../../assets/badges/empty-badge.svg";

const badgeStyle = css`
  height: 75px;
`;

const Badge = () => {
  return (
    <div>
      <img src={EmptyBadgeSVG} alt="Badge slot" css={badgeStyle} />
    </div>
  );
};

export default Badge;
