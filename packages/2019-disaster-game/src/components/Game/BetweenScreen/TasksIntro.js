/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { palette } from "../../../constants/style";

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
  return (
    <div css={contentWrapper}>
      <div>
        <p css={contentTitle}>Help yourself after an earthquake first</p>
        <p css={contentTitle}>...then help your neighbors!</p>
      </div>
    </div>
  );
};

export default TasksIntro;
