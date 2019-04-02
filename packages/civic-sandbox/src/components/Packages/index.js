import React from 'react';
import { connect } from 'react-redux';
import { css } from 'emotion';

import {
  PackageSelectorBox,
  CivicSandboxDashboard,
} from '@hackoregon/component-library';
import SandboxComponent from '../Sandbox';
import { fetchSandbox, setPackage } from '../../state/sandbox/actions';
import {
  isSandboxLoading,
  getSandboxData,
  getSandboxError,
  getSelectedFoundationDatum,
} from '../../state/sandbox/selectors';

const loader = css`
  background: #eee;
  padding: 30px;
`;

const error = css`
  background: #fee;
  color: #c00;
  padding: 30px;
`;

const capitalize = str =>
  str.length &&
  str
    .split(' ')
    .reduce(
      (full, word) => `${full} ${word[0].toUpperCase() + word.substring(1)}`,
      ''
    )
    .trim();

export class Packages extends React.Component {
  constructor() {
    super();
    this.state = {
      mapIsOpen: false,
    };
  }
  componentDidMount() {
    this.props.fetchSandbox();
  }

  closeMap = () => {
    this.setState({ mapIsOpen: false });
  };

  handlePackageSelection = selectedPackage => {
    this.props.setPackage(selectedPackage);
    this.setState({ mapIsOpen: true });
  };

  render() {
    const { isLoading, isError, sandbox, selectedFoundationDatum } = this.props;

    const packages = sandbox.packages
      ? Object.keys(sandbox.packages).map(p => ({
          description: sandbox.packages[p].description,
          title: capitalize(p),
        }))
      : [];

    const Loader = () => <div className={loader}>Loading...</div>;
    const ErrorMessage = () => (
      <div className={error}>Could not load data for the sandbox.</div>
    );

    return (
      <div
        className={css(`
        font-family: "Roboto Condensed", "Helvetica Neue", Helvetica, sans-serif;
      `)}
      >
        {!this.state.mapIsOpen && (
          <div>
            <div
              className={css(`
            padding: 1.5rem;
            text-align: center;
            font-size: 1.2rem;
          `)}
            >
              Select a data collection
            </div>
            <section
              className={css(`@media(min-width: 600px){
              display:flex;
              flex-wrap: wrap;
            }`)}
            >
              {isLoading && <Loader />}
              {packages &&
                packages.map(p => (
                  <div
                    key={p.title}
                    className={css(`@media(min-width: 600px) {
              width: 33%;
            }`)}
                  >
                    <PackageSelectorBox
                      title={p.title}
                      description={p.description}
                      onClick={() => this.handlePackageSelection(p.title)}
                    />
                  </div>
                ))}
            </section>
          </div>
        )}

        <section>{isError && <ErrorMessage />}</section>

        {this.state.mapIsOpen && (
          <div>
            <p>
              <a onClick={this.closeMap}>&lt; Back to Packages</a>
            </p>
            <section style={{ position: 'relative' }}>
              <SandboxComponent />
              {selectedFoundationDatum && (
                <div
                  className={css(`
                    position: absolute;
                    top: 21%;
                    left: 4%;
                    width: 96%;
                    height: 0;
                    @media(max-width: 900px) {
                      position: relative;
                      left: 0;
                      height: auto;
                    }
                `)}>
                  <CivicSandboxDashboard data={selectedFoundationDatum} />
                </div>
              )}
            </section>
          </div>
        )}

      </div>
    );
  }
}

Packages.displayName = 'Packages';

// Connect this to the redux store when necessary
export default connect(
  state => ({
    isLoading: isSandboxLoading(state),
    isError: getSandboxError(state),
    sandbox: getSandboxData(state),
    selectedFoundationDatum: getSelectedFoundationDatum(state),
  }),
  dispatch => ({
    fetchSandbox() {
      dispatch(fetchSandbox());
    },
    setPackage(selectedPackage = '') {
      dispatch(setPackage(selectedPackage));
    },
  })
)(Packages);
