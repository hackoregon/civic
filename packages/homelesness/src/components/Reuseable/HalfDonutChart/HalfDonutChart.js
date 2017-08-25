import React from 'react';
import PropTypes from 'prop-types';
import { PieChart, Pie, ResponsiveContainer, Text, Cell, Legend } from 'recharts';
import styles from './HalfDonutChart.styles.css';

class HalfDonutChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedSet: props.dataSets[0],
      selectedData: props.dataSets[0].data[0],
      colors: ['#75568D', '#AAA4AB'],
    };
    this.getColor = this.getColor.bind(this);
    this.pieLabel = this.pieLabel.bind(this);
    this.selectData = this.selectData.bind(this);
    this.selectSet = this.selectSet.bind(this);
  }
  getColor(name) {
    return name === this.state.selectedData.name ? this.state.colors[0] : this.state.colors[1];
  }
  pieLabel(options) {
    const { cx, cy, payload } = options;
    if (payload.name !== this.state.selectedData.name) {
      return null;
    }
    return (
      <Text
        x={cx}
        y={cy - 20}
        fontSize={34}
        fill={'black'}
        style={{ fontWeight: 'bold' }}
        textAnchor={'middle'}
      >
        {`${payload.value}%`}
      </Text>
    );
  }
  selectData(payload) {
    this.setState(prevState => ({
      ...prevState,
      selectedData: this.state.selectedSet.data.find(data => data.name === payload.name),
    }));
  }
  selectSet(name) {
    const newSet = this.props.dataSets.find(set => set.name === name);
    this.setState(prevState => ({
      ...prevState,
      selectedSet: newSet,
      selectedData: newSet.data[0],
    }));
  }
  render() {
    return (
      <div className={styles.container} >
        <ResponsiveContainer width={'100%'} height={225}>
          <PieChart
            margin={{ top: 0, right: 5, bottom: 100, left: 5 }}
          >
            <Pie
              startAngle={180}
              endAngle={0}
              data={[...this.state.selectedSet.data]}
              cy={'100%'}
              labelLine={false}
              innerRadius={'105%'}
              outerRadius={'185%'}
              fill="#e3dde8"
              label={this.pieLabel}
              onClick={this.selectData}
            >
              {
            this.state.selectedSet.data.map(data =>
              <Cell key={data.name} fill={this.getColor(data.name)} />)
          }
            </Pie>
            { this.props.legend ?
              <Legend
                iconType={'circle'}
                payload={this.state.selectedSet.data.map(data => ({
                  color: this.getColor(data.name),
                  type: 'circle',
                  value: data.name,
                  name: data.name,
                }))}
                wrapperStyle={{ bottom: '-35px' }}
                onClick={this.selectData}
              /> : null }
          </PieChart>
        </ResponsiveContainer>
      </div>
    );
  }
}

HalfDonutChart.propTypes = {
  dataSets: PropTypes.array.isRequired,
  legend: PropTypes.boolean,
};

HalfDonutChart.defaultProps = {
  legend: true,
};

export default HalfDonutChart;
