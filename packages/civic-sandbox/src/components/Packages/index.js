import React from 'react';
import { connect } from 'react-redux';
import { css } from 'emotion';

import { PackageSelectorBox } from '@hackoregon/component-library';

import {
  fetchSandbox,
  setPackage,
} from '../../state/sandbox/actions';
import {
  isSandboxLoading,
  getSandboxData,
  getSandboxError,
} from '../../state/sandbox/selectors';

const loader = css`
  background: #EEE;
  padding: 30px;
`;

const error = css`
  background: #FEE;
  color: #C00;
  padding: 30px;
`;

const capitalize = str => str.length && str.split(' ')
  .reduce((full, word) => `${full} ${word[0].toUpperCase() + word.substring(1)}`, '')
  .trim();

export class Packages extends React.Component {
  componentDidMount() {
    this.props.fetchSandbox();
    this.props.setPackage();
  }

  render() {
    const {
      isLoading,
      isError,
      selectedPackage,
      sandbox,
      setPackage,
    } = this.props;

    const packages = sandbox.packages ? Object.keys(sandbox.packages).map(p => ({ description: sandbox.packages[p].description, title: capitalize(p) })) : [];
    console.log(packages);

    const Loader = () => <div className={loader}>Loading...</div>;
    const ErrorMessage = () => <div className={error}>Could not load data for the sandbox.</div>;

    return (
      <div>
        <div>Select a package</div>
        <section
          className={css(`@media(min-width: 600px){
            display:flex;
            flex-wrap: wrap;
          }`)}
        >
          {isLoading && <Loader />}
          {packages && (packages.map(p => (<div
            key={p.title}
            className={css(`@media(min-width: 600px) {
            width: 33%;
          }`)}
          >
            <PackageSelectorBox title={p.title} description={p.description} /></div>)))
          }
        </section>
        <section>

          {isError && <ErrorMessage />}
        </section>
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
