/** @jsx jsx */
import { css, jsx } from "@emotion/core";

import QRCodeSVG from "../../../../assets/earthquake-heroes-qr-code.svg";
import Palette from "../../../constants/style";
import PlayerStats from "./PlayerStats";
import JourneyBar from "./JourneyBar";

const containerStyle = css`
  position: absolute;
  top: 0;
  left: 0;
  width: calc(100% - 70px);
  z-index: 103;
  background-color: ${Palette.darkGrey};
  height: 230px;
  padding: 0 35px;
  display: grid;
  grid-template-columns: repeat(3, auto);
`;

const QRCodeStyle = css`
  height: 160px;
  margin-top: 35px;
  position: relative;
  display: inline-grid;
`;

const TitleBar = () => {
  return (
    <div css={containerStyle}>
      <img
        src={QRCodeSVG}
        alt="QR code for civicplatform.org/EarthquakeHeroes"
        css={QRCodeStyle}
      />
      <JourneyBar />
      <PlayerStats />
    </div>
  );
};

export default TitleBar;
