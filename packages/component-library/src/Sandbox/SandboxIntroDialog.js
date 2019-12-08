import PropTypes from "prop-types";
/** @jsx jsx */
import { jsx, css } from "@emotion/core";

import Dialog from "../Dialog/Dialog";
import ButtonNew from "../ButtonNew/ButtonNew";
import Logo from "../Logo/Logo";

const contentWrapper = css`
  margin: 20px;
`;

const buttonWrapper = css`
  display: flex;
  justify-content: space-evenly;
`;

const hideOnMobile = css`
  @media (max-width: 500px) {
    width: 100%;
  }
`;

const SandboxIntroDialog = ({ open, onClose }) => (
  <Dialog open={open} onClose={onClose}>
    <div
      css={css(`
              margin: 0 0 10px 0;
              padding-top: 5px;
              background-color: #201024;
              color: white;
              height: 35px;
              text-align: center;
              cursor: pointer;
          `)}
    >
      <Logo type="sandboxLogoInverted" />
    </div>
    <div css={contentWrapper}>
      <h3>
        The CIVIC Sandbox is a curated data exploration tool to encourage
        exploration, enable comparison, and impact decision making.
      </h3>
      <div css={buttonWrapper}>
        <ButtonNew label="Add Your Data" css={hideOnMobile} />
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
