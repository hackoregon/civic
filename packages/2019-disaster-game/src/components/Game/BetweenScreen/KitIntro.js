/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { sample } from "lodash";
import instructionalAudioBoy from "../../../../assets/audio/kit_screen/boy_lets_prepare_for_an_earthquake.mp3";
import instructionalAudioGirl from "../../../../assets/audio/kit_screen/girl_lets_prepare_for_an_earthquake.mp3";
import { palette } from "../../../constants/style";
import Song from "../../atoms/Audio/Song";

const contentWrapper = css`
  height: 100vh;
  width: 100vw;
  z-index: 10;
  display: grid;
  justify-items: center;
  align-items: center;
`;

const contentTitle = css`
  font-family: "Boogaloo", sans-serif;
  font-size: 16rem;
  color: ${palette.salmon};
  text-align: center;
  margin: 0;
`;

const TasksIntro = () => {
  const instructionalAudio = sample([
    instructionalAudioBoy,
    instructionalAudioGirl
  ]);
  return (
    <div css={contentWrapper}>
      <p css={contentTitle}>Let&apos;s prepare for an earthquake</p>
      <Song songFile={instructionalAudio} shouldLoop={false} volume={1.0} />
    </div>
  );
};

export default TasksIntro;
