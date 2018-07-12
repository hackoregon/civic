import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { css } from 'emotion';

import { CivicStoryCard, Scatterplot } from '@hackoregon/component-library';

import { fetchVotersOnTheMove, fetchAwayVotersOnTheMove } from '../../state/voters-on-the-move/actions';

import {
  isVotersOnTheMovePending,
  catchVotersOnTheMoveErrors,
  getVotersOnTheMoveData,
  isAwayVotersOnTheMovePending,
  catchAwayVotersOnTheMoveErrors,
  getAwayVotersOnTheMoveData,
} from '../../state/voters-on-the-move/selectors';

const smallMultiples = css`
  display: flex;
  justify-content: center;
  width: 100%;
`;

const chartColumn = css`
  width: 100%
`;

const ageGroupLabels = [
  { category: 18, label: '18-25' },
  { category: 26, label: '26-32' },
  { category: 33, label: '33-39' },
  { category: 40, label: '40-49' },
  { category: 50, label: '50+' },
];

export class VotersOnTheMove extends React.Component {
  componentDidMount() {
    this.props.init();
  }

  render() {
    const {
      isLoading,
      error,
      votersOnTheMove,
      isAwayLoading,
      awayError,
      awayVotersOnTheMove,
    } = this.props;

    const data = { center: votersOnTheMove, away: awayVotersOnTheMove };

    const voterScatterplot = (age, direction) => (
      <Scatterplot
        data={data[direction].results.filter(({ age_group }) => age_group === age)}
        dataKey="x"
        dataValue="y"
        dataSeries="age_group"
        dataSeriesLabel={ageGroupLabels}
        xLabel="SE"
        yLabel="NW"
        domain={{ x: [-19.5, 19.5], y: [-10.5, 10.5] }}
      />
    );

    return (
      <CivicStoryCard
        title="Voters on the Move"
        slug="voters-on-the-move"
        loading={(isLoading || isAwayLoading)}
        error={(error || awayError) && 'error'}
      >
        { (votersOnTheMove && awayVotersOnTheMove) &&
          <div className={smallMultiples}>
            <div className={chartColumn}>
              <h2>Towards City Center</h2>
              {voterScatterplot(18, 'center')}
              {voterScatterplot(26, 'center')}
              {voterScatterplot(33, 'center')}
              {voterScatterplot(40, 'center')}
              {voterScatterplot(50, 'center')}
            </div>
            <div className={chartColumn}>
              <h2>Away From City Center</h2>
              {voterScatterplot(18, 'away')}
              {voterScatterplot(26, 'away')}
              {voterScatterplot(33, 'away')}
              {voterScatterplot(40, 'away')}
              {voterScatterplot(50, 'away')}
            </div>
          </div>
        }
      </CivicStoryCard>
    );
  }
}

VotersOnTheMove.displayName = 'VotersOnTheMove';
VotersOnTheMove.propTypes = {
  init: PropTypes.func,
  isLoading: PropTypes.bool,
  error: PropTypes.string,
  votersOnTheMove: PropTypes.arrayOf(PropTypes.object),
};

export default connect(
  state => ({
    isLoading: isVotersOnTheMovePending(state),
    error: catchVotersOnTheMoveErrors(state),
    votersOnTheMove: getVotersOnTheMoveData(state),
    isAwayLoading: isAwayVotersOnTheMovePending(state),
    awayError: catchAwayVotersOnTheMoveErrors(state),
    awayVotersOnTheMove: getAwayVotersOnTheMoveData(state),
  }),
  dispatch => ({
    init() {
      dispatch(fetchVotersOnTheMove());
      dispatch(fetchAwayVotersOnTheMove());
    },
  }),
)(VotersOnTheMove);
