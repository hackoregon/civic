import React from 'react';
import { connect } from 'react-redux';
import { css } from 'emotion';
import Modal from 'react-modal';

import { PackageSelectorBox } from '@hackoregon/component-library';
import SandboxComponent from '../Sandbox';
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
  constructor() {
    super();
    this.state = {
      modalIsOpen: false,
    };
  }
  componentDidMount() {
    this.props.fetchSandbox();
  }

  closeModal = () => {
    this.setState({ modalIsOpen: false });
  }

  handlePackageSelection = (selectedPackage) => {
    this.props.setPackage(selectedPackage);
    this.setState({ modalIsOpen: true });
  }

  render() {
    const {
      isLoading,
      isError,
      sandbox,
    } = this.props;

    const packages = sandbox.packages ? Object.keys(sandbox.packages).map(p => ({ description: sandbox.packages[p].description, title: capitalize(p) })) : [];

    const Loader = () => <div className={loader}>Loading...</div>;
    const ErrorMessage = () => <div className={error}>Could not load data for the sandbox.</div>;

    return (
      <div
        className={css(`
        font-family: "Roboto Condensed", "Helvetica Neue", Helvetica, sans-serif;
      `)}
      >
        <div
          className={css(`
          padding: 1.5rem;
          text-align: center;
          font-size: 1.2rem;
        `)}
        >Select a data collection</div>
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
            <PackageSelectorBox
              title={p.title}
              description={p.description}
              onClick={() => this.handlePackageSelection(p.title)}
            />
          </div>)))
          }
        </section>
        <section>

          {isError && <ErrorMessage />}
        </section>
        <section>
          <Modal
            isOpen={this.state.modalIsOpen}
            onAfterOpen={this.afterOpenModal}
            onRequestClose={this.closeModal}
            style={{
              content: {
                top: '50%',
                left: '50%',
                right: 'auto',
                bottom: 'auto',
                marginRight: '-50%',
                transform: 'translate(-50%, -50%)',
                width: '90%',
              },
            }}
            contentLabel="Civic Sandbox"
          >
            <div
              className={css(`
              position: absolute;
              right: 0;
              top: 5px;
            `)}
            >
              <button
                onClick={this.closeModal}
                className={css(`background: #fff;
                font-size: 1.5rem;
                border: 0;
                cursor: pointer;
                &:hover {
                  color: rgb(237,73,91);
                }
                `)}
              >x</button>
            </div>
            <SandboxComponent />
          </Modal>
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
