/* eslint-disable react/jsx-boolean-value, react/no-unused-prop-types */
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { BarChart, Bar, XAxis, YAxis, Text, Legend, ResponsiveContainer } from 'recharts';
import { StoryCard, Dropdown } from '@hackoregon/component-library/lib';
import styles from './styles.css';
import shared from '../shared.styles';

import { fetchPopulationData } from '../../state/Population/actions';
import {
  ethnicity,
  veteranStatus,
  disability,
  age,
  gender,
} from '../../state/Population/selectors';

const COLORS = ['#75568D', '#e3dde8'];
const valueLabel = options => (
  <Text {...options} fill={'#201024'} >{`${options.value}%`}</Text>
);
const axisLabel = options => (
  <Text {...options} fill={'#201024'} y={options.y - 45} width={200} style={{ fontWeight: 'bold' }}>
    {options.payload.value}
  </Text>
);

class HomelessPopulation extends React.Component {
  constructor() {
    super();
    this.state = {
      options: [
        { value: 'ethnicity', label: 'Ethnicity' },
        { value: 'veteranStatus', label: 'Veteran Status' },
        { value: 'disability', label: 'Disability' },
        { value: 'age', label: 'Age' },
        { value: 'gender', label: 'Gender' },
      ],
      value: 'ethnicity',
      footnote: {
        Ethnicity: 'All race data in this report are presented as an over-count, which means ' +
        'individuals were encouraged to select as many categories of race, ethnicity, or national' +
        'origin as apply and they were counted within each category. For that reason, the ' +
        'percentages may add up to more than 100.',
        'Veteran Status': 'People who have served in the US military are included in Multnomah ' +
        'county’s homeless population.\nIn 2015, 11% of the homeless have served in the US ' +
        'military. Of those, 39% stayed in transitional housing, 47% were unsheltered and 14% ' +
        'stayed in emergency shelters.',
        Disability: 'A disabling condition is an injury, illness or chronic health condition. ' +
        'These categories may include mental health and substance abuse as well as use of ' +
        'equipment, such as wheelchair use.\n41% of the homeless with a disabling condition were ' +
        'living unsheltered in 2015.',
        Gender: 'While the Point-in-Time Count includes transgender as an option, the American ' +
        'Community Survey (ACS) only includes male and female.',
        Age: '',
      },
    };
  }
  componentDidMount() {
    this.props.loadData();
  }
  handleChange(option) {
    this.setState({ value: option.value });
  }
  render() {
    return (
      <StoryCard title="Homeless Population">
        <div className={styles.container}>
          <p style={shared.text}>
              The graph below displays the percent of each type of homeless demographic against the
              same demographic for the general population.
          </p>

          <p style={shared.text}>
              People experiencing homelessness are more likely to be people of color, male, and more
              likely to have a disabling condition than Multnomah County residents as a whole.
          </p>
          <div className={styles.selectContainer}>
            <Dropdown
              options={this.state.options}
              onChange={option => this.handleChange(option)}
              value={this.state.value}
              clearable={false}
            />
          </div>
          <ResponsiveContainer width="100%" height={'100%'} minHeight={400} >
            <BarChart
              data={this.props[this.state.value]}
              layout={'vertical'}
              margin={{ top: 65, right: 10, left: 10, bottom: 0 }}
            >
              <Legend
                verticalAlign={'bottom'}
                align={'left'}
                layout={'horizontal'}
                iconSize={18}
                wrapperStyle={{ top: 0 }}
              />
              <XAxis
                type="number"
                axisLine={false}
                tickLine={false}
                tick={false}
              />
              <YAxis
                type="category"
                tickLine={false}
                dataKey="name"
                tick={axisLabel}
                mirror
                axisLine={false}
              />
              <Bar
                dataKey="general"
                fill={COLORS[1]}
                label={valueLabel}
                legendType={'circle'}
                barSize={24}
              />
              <Bar
                dataKey="homeless"
                fill={COLORS[0]}
                label={valueLabel}
                legendType={'circle'}
                barSize={29}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <p style={shared.footnote}>{this.state.footnote[this.state.value]}</p>
      </StoryCard>
    );
  }
}

HomelessPopulation.propTypes = {
  loadData: PropTypes.function,
  ethnicity: PropTypes.array,
  veteranStatus: PropTypes.array,
  disability: PropTypes.array,
  age: PropTypes.array,
  gender: PropTypes.array,
};

const mapDispatchToProps = dispatch => ({
  loadData: () => fetchPopulationData(dispatch),
});

const mapStateToProps = state => ({
  ethnicity: ethnicity(state),
  veteranStatus: veteranStatus(state),
  disability: disability(state),
  age: age(state),
  gender: gender(state),
});

export default connect(
  mapStateToProps, mapDispatchToProps,
)(HomelessPopulation);
