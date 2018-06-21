import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { css } from 'emotion';

import { CivicStoryCard, LineChart } from '@hackoregon/component-library';

import { fetchServiceAndRidership } from '../../state/service-and-ridership/actions';
import {
  isServiceAndRidershipPending,
  catchServiceAndRidershipErrors,
  getServiceAndRidershipData,
} from '../../state/service-and-ridership/selectors';

export class ServiceAndRidership extends React.Component {
  componentDidMount() {
    this.props.init();
  }

  render() {
    const {
      isLoading,
      error,
      serviceAndRidership,
    } = this.props;

    return (
      <CivicStoryCard
        title="ServiceAndRidership"
        slug="service-and-ridership"
        loading={isLoading}
        error={error}
      >
          <p>
Newly released findings from TriMet shows a slow decline in public transit ridership relative to population growth over the last 10 years, a pattern which appears to be consistent across the nation.  While the cause of decline in ridership doesn't point to a single variable, it's been suggested that housing affordability and economic displacement may play a role in this phenomenon.
          </p>
          { serviceAndRidership &&
            <LineChart
              title="Public Transit Ridership"
              subtitle="Average daily ridership for TriMet bus and rail (unlinked trips)"
              data={serviceAndRidership}
              xLabel="Year"
              yLabel="Ridership"
              dataKey="year"
              dataValue="ons"
              dataSeries="type"
              xNumberFormatter={d => `${d}`}
            />
          }
      </CivicStoryCard>
    );
  }
}
ServiceAndRidership.displayName = 'ServiceAndRidership';
ServiceAndRidership.propTypes = {
  init: PropTypes.func,
  isLoading: PropTypes.bool,
  error: PropTypes.string,
  serviceAndRidership: PropTypes.arrayOf(PropTypes.object),
};

export default connect(
  state => ({
    isLoading: isServiceAndRidershipPending(state),
    error: catchServiceAndRidershipErrors(state),
    serviceAndRidership: getServiceAndRidershipData(state),
  }),
  dispatch => ({
    init() {
      dispatch(fetchServiceAndRidership());
    },
  }),
)(ServiceAndRidership);