import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import StoryCard from '@hackoregon/component-library/lib/StoryCard/StoryCard';
import shared from '../shared.styles';

import { fetchDefinitionData } from '../../state/Definition/actions';
import DefinitionPieChart from './DefinitionPieChart';
import { shelterType } from '../../state/Definition/selectors';

import TransitionalHousing from './TransitionalHousing';
import EmergencyShelter from './EmergencyShelter';
import Unsheltered from './Unsheltered';

import DoubledUp from './DoubledUp';


const pitSurveyStaticData = [
  { name: 'PitSurvey', value: 3801, year: 2015 },
  { name: 'doubledUp', value: 12543, year: 2015 },
  { name: 'PitSurvey', value: 4441, year: 2013 },
  { name: 'doubledUp', value: 11467, year: 2013 },
  { name: 'PitSurvey', value: 4655, year: 2011 },
  { name: 'doubledUp', value: 10908, year: 2011 },
];

const colors = ['#75568D', '#d4d5d6'];


class Definition extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      shelterCategories: {
        unsheltered: 'Unsheltered',
        emergencyShelter: 'Emergency Shelter',
        transitionalHousing: 'Transitional Housing',
      },
      shelterInitialValue: 'Unsheltered',
      pitCategories: {
        PitSurvey: 'PIT Survey',
        doubledUp: 'Doubled Up Estimate',
      },
      pitInitialValue: 'PIT Survey',
    };
  }
  componentDidMount() {
    this.props.loadData();
  }
  render() {
    return (
      <StoryCard title="What does it mean to be homeless?">
        <div>
          <DefinitionPieChart
            data={this.props.shelterTypeData.filter(item => item.year !== 2009)}
            initialValue={this.state.shelterInitialValue}
            colors={colors}
            categories={this.state.shelterCategories}
            content={{
              'Transitional Housing': <TransitionalHousing  data={this.props.shelterTypeData} />,
              Unsheltered: <Unsheltered />,
              'Emergency Shelter': <EmergencyShelter />,
            }}
          />
          <div className="Definition-container">
            <h3 style={shared.subHeader}>Not Quite Apples-to-Apples</h3>
            <p style={shared.footnote}>
              The services people experiencing homelessness need are varied and change over time. In
              response, so do the services provided and the policies guiding them. For example, an
              emergency shelter that expands its services to meet new local demands or align with
              new policy goals may be reclassified as transitional housing in subsequent years. This
              means that the numbers of people in each category are not strictly comparable across
              years, even as they reveal useful information about local needs and capacity.
            </p>
          </div>
          <div className="Definition-container top-spacer" >
            <DefinitionPieChart
              data={pitSurveyStaticData}
              initialValue={this.state.pitInitialValue}
              colors={colors}
              categories={this.state.pitCategories}
              content={{
                'PIT Survey': <DoubledUp />,
                'Doubled Up Estimate': <DoubledUp />,
              }}
            />
          </div>
        </div>
      </StoryCard>
    );
  }
}

Definition.propTypes = {
  shelterTypeData: PropTypes.array.isRequired,
  loadData: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  loadData: () => fetchDefinitionData(dispatch),
});

const mapStateToProps = state => ({
  shelterTypeData: shelterType(state),
});

export default connect(
  mapStateToProps, mapDispatchToProps,
)(Definition);
