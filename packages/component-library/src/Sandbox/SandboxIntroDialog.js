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
  padding: 1rem 0 1rem 0;
`;

const hideOnMobile = css`
  @media (max-width: 500px) {
    display: none;
  }
`;

const SandboxIntroDialog = ({ open, onClose }) => (
  <Dialog open={open} onClose={onClose}>
    <div
      css={css(`
              margin: 0;
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
      <h2>An exploratory data resource you can contribute to</h2>
      <h3>
        Work with us to prepare and document your dataset, and see it as map
        layers.
      </h3>
      <h3>
        Explore curated collections to see patterns and relationships, then dig
        deeper into the context.
      </h3>
      <div css={buttonWrapper}>
        <div css={hideOnMobile}>
          <ButtonNew label="Contribute Data" />
        </div>
        <div>
          <ButtonNew label="Explore Data" onClick={onClose} />
        </div>
      </div>
    </div>
  </Dialog>
);

SandboxIntroDialog.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func
};

export default SandboxIntroDialog;
