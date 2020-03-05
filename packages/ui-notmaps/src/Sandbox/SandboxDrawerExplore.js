/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { string, bool, func, shape } from "prop-types";
import { Fragment } from "react";
import BookIcon from "@material-ui/icons/Book";
import PackageSelectorBox from "../PackageSelectorBox/PackageSelectorBox";
import ButtonNew from "../ButtonNew/ButtonNew";
import Placeholder from "../Placeholder/Placeholder";

const SandboxDrawerExplore = props => {
  const {
    data,
    selectedPackage,
    toggleLayerSelector,
    updatePackage,
    errors,
    toggleContributeDialog
  } = props;

  return (
    <Fragment>
      <div
        css={css(`
            position: relative;
            z-index: 900;
          `)}
      >
        <div css={css(`margin: 0 10px;`)}>
          <h2>
            <BookIcon
              fontSize="large"
              css={css(`
                vertical-align: middle;
                padding-right: 2px;
              `)}
            />
            Collections
          </h2>
          <Placeholder>
            <ButtonNew
              label="Learn How To Add Your Data"
              onClick={toggleContributeDialog}
            />
          </Placeholder>
        </div>
        <PackageSelectorBox
          selectedPackages={selectedPackage}
          packages={data && data.packages.length ? data.packages : []}
          onChange={name => {
            updatePackage({ displayName: name });
            toggleLayerSelector();
          }}
        />
      </div>
      {errors ? (
        <div
          css={css(`
                margin: auto;
                width: 80%;
              `)}
        >
          <p>There was an error fetching the data.</p>
        </div>
      ) : null}
    </Fragment>
  );
};

export default SandboxDrawerExplore;

SandboxDrawerExplore.propTypes = {
  data: shape({}),
  selectedPackage: string,
  updatePackage: func,
  toggleLayerSelector: func,
  toggleContributeDialog: bool,
  errors: bool
};
