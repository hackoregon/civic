import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { css } from 'emotion';

import { CivicStoryCard, BarChart } from '@hackoregon/component-library';

import { fetchUrbanCampsiteSweepsByWeek } from '../../state/magnitude-of-urban-campsite-sweeps/actions';

import {
  isMagnitudeOfUrbanCampsiteSweepsPending,
  catchMagnitudeOfUrbanCampsiteSweepsErrors,
  getMagnitudeOfUrbanCampsiteSweepsData,
  formatDateData,
} from '../../state/magnitude-of-urban-campsite-sweeps/selectors';

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

export class MagnitudeOfUrbanCampsiteSweeps extends React.Component {
  componentDidMount() {
    this.props.init();
  }

  render() {
    const {
      isLoading,
      error,
      magnitudeOfUrbanCampsiteSweeps,
      formattedDateData,
    } = this.props;

    if (isLoading) {
      return <div className={cardLoading}>Loading...</div>;
    } else if (!magnitudeOfUrbanCampsiteSweeps) {
      return <div className={cardError}>{error ? `API ${error}` : 'Could not render Magnitude of Urban Campsite Sweeps.'}</div>;
    }

    return (
      <CivicStoryCard
        title="Magnitude of Urban Campsite Sweeps"
        slug="magnitude-of-urban-campsite-sweeps"
      >
        <p>
          Newly released findings from TriMet shows a slow decline in public transit ridership relative to population growth over the last 10 years, a pattern which appears to be consistent across the nation.  While the cause of decline in ridership doesn't point to a single variable, it's been suggested that housing affordability and economic displacement may play a role in this phenomenon.
        </p>
        { magnitudeOfUrbanCampsiteSweeps &&
          <BarChart
            title="Public Transit Ridership"
            subtitle="Average daily ridership for TriMet bus and rail (unlinked trips)"
            data={magnitudeOfUrbanCampsiteSweeps}
            xLabel="Year"
            yLabel="Ridership"
            dataKey="report_time"
            dataValue="count"
            dataSeries="type"
            xNumberFormatter={d => `${d}`}
          />
        }
        {console.log(formattedDateData)}
      </CivicStoryCard>
    );
  }
}
MagnitudeOfUrbanCampsiteSweeps.displayName = 'MagnitudeOfUrbanCampsiteSweeps';
MagnitudeOfUrbanCampsiteSweeps.propTypes = {
  init: PropTypes.func,
  isLoading: PropTypes.bool,
  error: PropTypes.string,
  magnitudeOfUrbanCampsiteSweeps: PropTypes.arrayOf(PropTypes.object),
};

export default connect(
  state => ({
    isLoading: isMagnitudeOfUrbanCampsiteSweepsPending(state),
    error: catchMagnitudeOfUrbanCampsiteSweepsErrors(state),
    magnitudeOfUrbanCampsiteSweeps: getMagnitudeOfUrbanCampsiteSweepsData(state),
    formattedDateData: formatDateData(state),
  }),
  dispatch => ({
    init() {
      dispatch(fetchUrbanCampsiteSweepsByWeek());
    },
  }),
)(MagnitudeOfUrbanCampsiteSweeps);
