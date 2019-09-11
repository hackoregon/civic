/* eslint-disable import/no-extraneous-dependencies */
import React from "react";
import { connect } from "react-redux";
import { css } from "emotion";
import { bool, func, shape } from "prop-types";

import {
  PackageSelectorBox,
  CivicSandboxDashboard
} from "@hackoregon/component-library";
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
      mapIsOpen: false,
      dashboardIsOpen: false
    };
  }

  componentDidMount() {
    const { fetchSandbox: cdmFetchSandbox } = this.props;
    cdmFetchSandbox();
  }

  componentDidUpdate(prevProps) {
    const { isLoading, sandbox, setPackage: cduSetPackage } = this.props;
    if (!isLoading && prevProps.isLoading) {
      cduSetPackage(sandbox.packages[6]);
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({ mapIsOpen: true });
    }

    console.log("prevProps:", prevProps);
    const { selectedFoundationDatum: previousSelectedFoundation } = prevProps;
    const { selectedFoundationDatum: currentSelectedFoundation } = this.props;

    const previousID =
      previousSelectedFoundation &&
      previousSelectedFoundation.feature &&
      previousSelectedFoundation.feature.object
        ? previousSelectedFoundation.feature.object.id
        : null;
    const currentID =
      currentSelectedFoundation &&
      currentSelectedFoundation.feature &&
      currentSelectedFoundation.feature.object
        ? currentSelectedFoundation.feature.object.id
        : null;

    if (previousID !== currentID) {
      this.toggleDashboardOpen();
    }
    if (previousID !== null && currentID === null) {
      this.toggleDashboardClose();
    }
  }

  closeMap = () => {
    this.setState({ mapIsOpen: false });
  };

  handlePackageSelection = selectedPackage => {
    const { setPackage: hpsSetPackage } = this.props;
    hpsSetPackage(selectedPackage);
    this.setState({ mapIsOpen: true });
  };

  toggleDashboard = () => {
    this.setState(prevState => ({
      dashboardIsOpen: !prevState.dashboardIsOpen
    }));
  };

  toggleDashboardOpen = () => {
    this.setState({ dashboardIsOpen: true });
  };

  toggleDashboardClose = () => {
    this.setState({ dashboardIsOpen: false });
  };

  render() {
    const { isError, sandbox, selectedFoundationDatum } = this.props;

    const { mapIsOpen, dashboardIsOpen } = this.state;

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
          padding: 10px 0 0 0;
          font-family: "Roboto Condensed", "Helvetica Neue", Helvetica, sans-serif;
          border: 0px solid crimson;
          width: 100%;
          height: 80vh;
          min-height: 600px;
        `)}
      >
        {mapIsOpen && (
          <div>
            <section style={{ position: "relative" }}>
              <SandboxComponent />
              <div
                className={css(`
                  position: absolute;
                  bottom: 2.5%;
                  left: 2.5%;
                  width: 95%;
                  @media(max-width: 600px) {
                    position: absolute;
                    bottom: 1%;
                    left: 0;
                  }
              `)}
              >
                <CivicSandboxDashboard
                  data={selectedFoundationDatum}
                  onClick={this.toggleDashboard}
                  isDashboardOpen={dashboardIsOpen}
                />
              </div>
            </section>
            <p>
              {/* <Button onClick={this.closeMap}>
                &lt; Go to Data Collections
              </Button> */}
            </p>
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
  isError: bool,
  selectedFoundationDatum: shape({})
};
