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

const headerLogoContainer = css`
  display: flex;
  padding: 1rem 0 1rem 0;
`;

const logoContainer = css`
  margin: auto;
  padding-right: 1rem;
`;

const SandboxIntroDialog = ({ open, onClose }) => (
  <Dialog open={open} onClose={onClose}>
    <div css={contentWrapper}>
      <div css={headerLogoContainer}>
        <div css={logoContainer}>
          <Logo type="squareLogo" />
        </div>
        <h2>An exploratory data resource where you could see your data</h2>
      </div>
      <h3>
        Work with us to prepare and document your dataset, and see it as map
        layers.
      </h3>
      <h3>
        Explore curated collections to see patterns and relationships, then dig
        deeper into the context.
      </h3>
      <div css={buttonWrapper}>
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
