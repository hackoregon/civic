import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { css } from 'emotion';

import { CivicStoryCard, LineChart, Dropdown } from '@hackoregon/component-library';

import { fetchNeighborhoodAges, updateUserNeighborhood } from '../../state/neighborhoods-through-the-ages/actions';
import {
  isNeighborhoodAgesPending,
  catchNeighborhoodAgesErrors,
  getNeighborhoodAgesData,
  getListOfNeighborhoods,
} from '../../state/neighborhoods-through-the-ages/selectors';

const options = [
  { value: 'one', label: 'One' },
  { value: 'two', label: 'Two' },
];

const cardLoading = css`
  width: 100%;
  padding: 50px;
  text-align: center;
  background: #EEE;
`;

const cardError = css`
  width: 100%;
  padding: 50px;
  text-align: center;
  background: #FDD;
  border: 1px solid #C99;
`;

export class NeighborhoodsThroughTheAges extends React.Component {
  componentDidMount() {
    this.props.init();
  }

  render() {
    const {
      isLoading,
      error,
      data,
      neighborhoods,
    } = this.props;

    if (isLoading) {
      return <div className={cardLoading}>Loading...</div>;
    } else if (!data) {
      return <div className={cardError}>{error ? `API ${error}` : 'Could not render Neighborhoods Through The Ages.'}</div>;
    }

    return (
      <CivicStoryCard
        title="Neighborhoods Through the Ages"
        slug="neighborhoods-through-the-ages"
      >
        <Dropdown
          value={''}
          onChange={event => this.props.setNeighborhood(event)}
          options={neighborhoods || options}
        />
        <p>
Here is some relevant text about ages.
        </p>
      </CivicStoryCard>
    );
  }
}

NeighborhoodsThroughTheAges.displayName = 'NeighborhoodsThroughTheAges';
NeighborhoodsThroughTheAges.propTypes = {
  init: PropTypes.func,
  setNeighborhood: PropTypes.func,
  isLoading: PropTypes.bool,
  error: PropTypes.string,
  neighborhoods: PropTypes.arrayOf(PropTypes.string),
};

export default connect(
  state => ({
    isLoading: isNeighborhoodAgesPending(state),
    error: catchNeighborhoodAgesErrors(state),
    data: getNeighborhoodAgesData(state),
    neighborhoods: getListOfNeighborhoods(state),
  }),
  dispatch => ({
    init() {
      dispatch(fetchNeighborhoodAges());
    },
    setNeighborhood(neighborhood) {
      dispatch(updateUserNeighborhood(neighborhood));
    },
  }),
)(NeighborhoodsThroughTheAges);
