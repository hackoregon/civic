import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { css } from 'emotion';

import { CivicStoryCard, BarChart, Collapsable } from '@hackoregon/component-library';
import { monthYear } from '@hackoregon/component-library/src/utils/formatters';

import { fetchUrbanCampsiteSweepsByWeek } from '../../state/magnitude-of-urban-campsite-sweeps/actions';

import {
  isMagnitudeOfUrbanCampsiteSweepsPending,
  catchMagnitudeOfUrbanCampsiteSweepsErrors,
  getMagnitudeOfUrbanCampsiteSweepsData,
} from '../../state/magnitude-of-urban-campsite-sweeps/selectors';

export class MagnitudeOfUrbanCampsiteSweeps extends React.Component {
  componentDidMount() {
    this.props.init();
  }

  render() {
    const {
      isLoading,
      error,
      magnitudeOfUrbanCampsiteSweeps,
    } = this.props;

    return (
      <CivicStoryCard
        title="Magnitude of Urban Campsite Sweeps"
        slug="magnitude-of-urban-campsite-sweeps"
        loading={isLoading}
        error={error && 'Could not load sweeps data'}
        source="https://github.com/hackoregon/neighborhoods-2018/tree/master/docs/campsites"
      >
        <Collapsable>
          <Collapsable.Section>
            <div>
              <p>The Homelessness/Urban Camping Impact Reduction Program (HUCIRP) reports intersections of all posted sweeps of campsites in a given week. This visualization counts the total number of reported sweeps. Portland has had an average of 112.4 sweeps per month, and the amount of sweeps has increased significantly over time.</p>
              { magnitudeOfUrbanCampsiteSweeps &&
                <BarChart
                  title="Portland's Urban Campsite Sweeps"
                  subtitle="Total count of campsite clean-ups by month, 2016-2018"
                  data={magnitudeOfUrbanCampsiteSweeps}
                  xLabel="Month"
                  yLabel="Sweeps"
                  dataKey="date"
                  dataValue="count"
                  xNumberFormatter={monthYear}
                />
              }
            </div>
          </Collapsable.Section>
          <Collapsable.Section hidden>
            <div>
              <p>Camping, whether for recreation or for survival, is not permitted in the City of Portland (City Code 14A.50.020 and 14A.50.). To enforce this, the City posts signs 24 hours in advance of a campsite clean-up, or ‘sweep’. Any property that remains after 24 hours is picked up and stored in a facility for 30 days.</p>
              <p>Let's take a look at the past 18 months of sweeps in our city.</p>
              <p>The amount of campsite sweeps significantly increased to a peak of 311 sweeps in one month during October, 2017. The past 8 months have all been above the average for sweeps, showing that the trend of rising sweeps is consistent.</p>
              <p>The data here come from online reports posted by the Homelessness/Urban Camping Impact Reduction Program (HUCIRP) of the City of Portland that contains a log of where campsites were swept in any given week, providing the intersection or a description of the surrounding area, as well as predicted clean-up sites for future weeks. This collection quantifies and maps this data for the first time, to our knowledge.</p>
            </div>
          </Collapsable.Section>
        </Collapsable>
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
  }),
  dispatch => ({
    init() {
      dispatch(fetchUrbanCampsiteSweepsByWeek());
    },
  }),
)(MagnitudeOfUrbanCampsiteSweeps);
