/* eslint-disable import/no-extraneous-dependencies */

/**
 * Note, this component doesn't really do much at this point other than render the SandboxComponent
 * If package selector is added back mapIsOpen could be useful again
 */

import React from "react";
import { connect } from "react-redux";
import { css } from "emotion";
import { bool, func, shape } from "prop-types";

import { PackageSelectorBox } from "@hackoregon/component-library";
import SandboxComponent from "../Sandbox";
import { fetchSandbox, setPackage } from "../../state/sandbox/actions";
import {
  isSandboxLoading,
  getSandboxData,
  getSandboxError,
  getSelectedFoundationDatum
} from "../../state/sandbox/selectors";

const error = css`
  background: #fee;
  color: #c00;
  padding: 30px;
`;

export class Packages extends React.Component {
  constructor() {
    super();
    this.state = {
      mapIsOpen: false
    };
  }

  componentDidMount() {
    const { fetchSandbox: cdmFetchSandbox } = this.props;
    cdmFetchSandbox();
  }

  componentDidUpdate(prevProps) {
    const { isLoading, sandbox, setPackage: cduSetPackage } = this.props;
    if (!isLoading && prevProps.isLoading) {
      cduSetPackage(sandbox.packages[0]);
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({ mapIsOpen: true });
    }
  }

  handlePackageSelection = selectedPackage => {
    const { setPackage: hpsSetPackage } = this.props;
    hpsSetPackage(selectedPackage);
    this.setState({ mapIsOpen: true });
  };

  render() {
    const { isError, sandbox } = this.props;

    const { mapIsOpen } = this.state;

    const packages = sandbox.packages
      ? sandbox.packages.map(p => ({
          ...p,
          description: p.description,
          title: p.displayName
        }))
      : [];

    const ErrorMessage = () => (
      <div className={error}>Could not load data for the sandbox.</div>
    );

    return (
      <div
        className={css(`
          padding: 0 0 0 0;
          font-family: "Roboto Condensed", "Helvetica Neue", Helvetica, sans-serif;
          border: 0px solid crimson;
          width: 100%;
          height: 100vh;
        `)}
      >
        {mapIsOpen && (
          <div>
            <section style={{ position: "relative" }}>
              <SandboxComponent />
            </section>
          </div>
        )}

        {!mapIsOpen && (
          <div>
            <section
              className={css(`
                @media(min-width: 600px){
                  display:flex;
                  flex-wrap: wrap;
                }`)}
            >
              {packages &&
                packages.map(p => (
                  <div
                    key={p.title}
                    className={css(`
                      @media(min-width: 600px) {
                        width: 33%;
                      }`)}
                  >
                    <PackageSelectorBox
                      title={p.title}
                      description={p.description}
                      onClick={() => this.handlePackageSelection(p)}
                    />
                  </div>
                ))}
            </section>
          </div>
        )}

        <section>{isError && <ErrorMessage />}</section>
      </div>
    );
  }
}

Packages.displayName = "Packages";

// Connect this to the redux store when necessary
export default connect(
  state => ({
    isLoading: isSandboxLoading(state),
    isError: getSandboxError(state),
    sandbox: getSandboxData(state),
    selectedFoundationDatum: getSelectedFoundationDatum(state)
  }),
  dispatch => ({
    fetchSandbox() {
      dispatch(fetchSandbox());
    },
    setPackage(selectedPackage = "") {
      dispatch(setPackage(selectedPackage));
    }
  })
)(Packages);

Packages.propTypes = {
  sandbox: shape({}),
  fetchSandbox: func,
  isLoading: bool,
  setPackage: func,
  isError: bool
};
