/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { palette } from "../../../constants/style";

const contentWrapper = css`
  height: 100vh;
  width: 60vw;
  z-index: 10;
  display: grid;
  justify-items: center;
  align-items: center;
  justify-self: center;
`;

const contentTitle = css`
  font-family: "Akkurat", sans-serif;
  font-weight: bold;
  font-size: 12rem;
  color: ${palette.darkBlue};
  text-align: center;
  margin: 0;
`;

const TasksIntro = () => {
  return (
    <div css={contentWrapper}>
      <div>
        <p css={contentTitle}>Help yourself after an earthquake first,</p>
        <br />
        <p css={contentTitle}>then help your neighbors!</p>
      </div>
    </div>
  );
};

export default TasksIntro;
