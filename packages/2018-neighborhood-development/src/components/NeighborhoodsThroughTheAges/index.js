import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { css } from 'emotion';

import { CivicStoryCard, LineChart } from '@hackoregon/component-library';

import { fetchNeighborhoodAges } from '../../state/neighborhoods-through-the-ages/actions';
import {
  isNeighborhoodAgesPending,
  catchNeighborhoodAgesErrors,
  getNeighborhoodAgesData,
} from '../../state/neighborhoods-through-the-ages/selectors';

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
      neighborhoodAges,
    } = this.props;

    if (isLoading) {
      return <div className={cardLoading}>Loading...</div>;
    } else if (!neighborhoodAges) {
      return <div className={cardError}>{error ? `API ${error}` : 'Could not render Neighborhoods Through The Ages.'}</div>;
    }

    return (
      <CivicStoryCard
        title="Neighborhoods Through the Ages"
        slug="neighborhoods-through-the-ages"
      >
        <p>
Newly released findings from TriMet shows a slow decline in public transit ridership relative to population growth over the last 10 years, a pattern which appears to be consistent across the nation.  While the cause of decline in ridership doesn't point to a single variable, it's been suggested that housing affordability and economic displacement may play a role in this phenomenon.
        </p>
      </CivicStoryCard>
    );
  }
}

NeighborhoodsThroughTheAges.displayName = 'NeighborhoodsThroughTheAges';
NeighborhoodsThroughTheAges.propTypes = {
  init: PropTypes.func,
  isLoading: PropTypes.bool,
  error: PropTypes.string,
  neighborhoodAges: PropTypes.arrayOf(PropTypes.object),
};

export default connect(
  state => ({
    isLoading: isNeighborhoodAgesPending(state),
    error: catchNeighborhoodAgesErrors(state),
    neighborhoodAges: getNeighborhoodAgesData(state),
  }),
  dispatch => ({
    init() {
      dispatch(fetchNeighborhoodAges());
    },
  }),
)(NeighborhoodsThroughTheAges);
