import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { css } from 'emotion';

import { CivicStoryCard, LineChart } from '@hackoregon/component-library';

import { fetchProactivePlanning } from '../../state/proactive-planning/actions';
import {
  isProactivePlanningPending,
  catchProactivePlanningErrors,
  getProactivePlanningData,
} from '../../state/proactive-planning/selectors';

export class ProactivePlanning extends React.Component {
  componentDidMount() {
    this.props.init();
  }

  render() {
    const {
      isLoading,
      error,
      proactivePlanning,
    } = this.props;

    return (
      <CivicStoryCard
        title="Proactive Planning for Citywide Resiliance"
        slug="proactive-planning"
        loading={isLoading}
        error={error && 'Error loading data'}
      >
          <p>
Newly released findings from TriMet shows a slow decline in public transit ridership relative to population growth over the last 10 years, a pattern which appears to be consistent across the nation.  While the cause of decline in ridership doesn't point to a single variable, it's been suggested that housing affordability and economic displacement may play a role in this phenomenon.
          </p>
          { proactivePlanning &&
            <LineChart
              title="Public Transit Ridership"
              subtitle="Average daily ridership for TriMet bus and rail (unlinked trips)"
              data={proactivePlanning}
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
ProactivePlanning.displayName = 'proactivePlanning';
ProactivePlanning.propTypes = {
  init: PropTypes.func,
  isLoading: PropTypes.bool,
  error: PropTypes.string,
  proactivePlanning: PropTypes.arrayOf(PropTypes.object),
};

export default connect(
  state => ({
    isLoading: isProactivePlanningPending(state),
    error: catchProactivePlanningErrors(state),
    proactivePlanning: getProactivePlanningData(state),
  }),
  dispatch => ({
    init() {
      dispatch(fetchProactivePlanning());
    },
  }),
)(ProactivePlanning);