import PropTypes from "prop-types";
/** @jsx jsx */
import { jsx, css } from "@emotion/core";

import Dialog from "../Dialog/Dialog";
import ButtonNew from "../ButtonNew/ButtonNew";

const contentWrapper = css`
  margin: 20px;
`;

const buttonWrapper = css`
  display: flex;
  justify-content: space-evenly;
`;

const SandboxIntroDialog = ({ open, onClose }) => (
  <Dialog open={open} onClose={onClose}>
    <div
      css={css(`
            margin: 0;
            padding: 0;
            background-color: #201024;
            color: white;
            height: 35px;
            text-align: center;
          `)}
    >
      <h2
        css={css(`
              margin: 0;
            `)}
      >
        CIVIC Sandbox
      </h2>
    </div>
    <div css={contentWrapper}>
      <h3>
        The CIVIC Sandbox is a curated data exploration tool to encourage
        exploration, enable comparison, and impact decision making.
      </h3>
      <div css={buttonWrapper}>
        <ButtonNew label="Add Your Data" />
        <ButtonNew label="Explore Data" onClick={onClose} />
      </div>
    </div>
  </Dialog>
);

SandboxIntroDialog.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func
};

export default SandboxIntroDialog;
