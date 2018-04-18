import React from 'react';
import PropTypes from 'prop-types';
import { PieChart, Pie, ResponsiveContainer, Text, Cell, Legend } from 'recharts';
import { css } from 'emotion';
import CustomPieLegend from './CustomPieLegend';

const containerClass = css`
  color:#726371;
  font-weight: bold;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 35px;
`;

const yearsContainerClass = css`
  display: flex;
  justify-content: space-between;
`;

const listItemClass = css`
  display: inline;
  padding: 10px;
  color: #AAA4AB;
  flex: inherit;
`;

const linkClass = css`
  display: inline-block;
  padding:5px;
  font-size: 1.3em;
  border: 0;
  font-family: inherit;

  &:hover {
    color: black;
    cursor: pointer;
  }
`;

const linkActiveClass = css`
  font-weight: bold;
  color: black;
  border-bottom: 3px solid black;
`;

const findPercentage = (val, arr) => {
  const total = arr.reduce((acc, cur) => acc + cur.value, 0);
  return (val / total) * 100;
};

const getUniqueYears = arr => (
  arr.reduce((acc, curr) => {
    if (acc.indexOf(curr.year) === -1) {
      acc.push(curr.year);
    }
    return acc;
  }, []).sort()
);

const getKeyByValue = (obj, val) => (
  Object.keys(obj).find(key => obj[key] === val)
);

const pieLabel = (options) => {
  if (!options.payload.label) {
    return null;
  }

  return (
    <Text
      {...options}
      x={options.cx}
      y={options.cy - 20}
      fontSize={34}
      fill={'black'}
      style={{ fontWeight: 'bold' }}
      textAnchor={'middle'}
      alignmentBaseline="middle"
      className="recharts-pie-label-text"
    >
      {`${options.payload.value.toFixed(1)}%`}
    </Text>
  );
};


class DefinitionPieChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      year: 2015,
      activeValue: props.initialValue,
    };

    this.updateCategory = this.updateCategory.bind(this);
    this.cleanData = this.cleanData.bind(this);
  }

  cleanData(data) {
    return data.filter(item => item.year === this.state.year)
      .map((item, idx, arr) => (
        { ...item,
          name: this.props.categories[item.name],
          label: item.name === getKeyByValue(this.props.categories,
            this.state.activeValue) || false,
          value: findPercentage(item.value, arr),
          rawCount: item.value,
          rawTotal: arr.reduce((acc, cur) => acc + cur.value, 0),
        }
      ));
  }

  updateCategory(val) {
    if (val !== this.state.activeValue) {
      this.setState({ activeValue: val });
    }
  }

  render() {
    return (
      <div style={{ marginBottom: '65px' }} >
        <div>
          { this.props.data.length > 0 &&
            React.cloneElement(this.props.content[this.state.activeValue],
              { year: this.state.year,
                data: this.cleanData(this.props.data)
                .filter(item => item.name === this.state.activeValue)[0] })
          }
        </div>
        <div className={containerClass}>
          <div className={yearsContainerClass}>
            <ul>
              {
              getUniqueYears(this.props.data)
              .map((item) => {
                const active = item === this.state.year ? linkActiveClass : '';
                return (
                  <li className={listItemClass} key={item} >
                    <a
                      className={`${linkClass} ${active}`}
                      onClick={() => this.setState({ year: item })}
                    >
                      {item}
                    </a>
                  </li>
                );
              })
            }
            </ul>
          </div>
          <ResponsiveContainer width={'100%'} height={225}>
            <PieChart
              margin={{ top: 0, right: 5, bottom: 120, left: 5 }}
            >
              <Pie
                startAngle={180}
                endAngle={0}
                data={this.cleanData(this.props.data)}
                cy={'100%'}
                labelLine={false}
                innerRadius={'105%'}
                outerRadius={'185%'}
                fill="#e3dde8"
                animationDuration={900}
                label={pieLabel}
                onClick={options => this.updateCategory(options.payload.name)}
              >
                {
                this.cleanData(this.props.data).map((entry) => {
                  const color = entry.name === this.state.activeValue
                    ? this.props.colors[0]
                    : this.props.colors[1];
                  return <Cell fill={color} key={entry.value} />;
                })
              }
              </Pie>
              <Legend
                wrapperStyle={{ bottom: '-75px' }}
                align={'center'}
                content={
                  <CustomPieLegend
                    updateCategory={this.updateCategory}
                    active={this.state.activeValue}
                  />
                }
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    );
  }
}

DefinitionPieChart.propTypes = {
  colors: PropTypes.array,
  categories: PropTypes.object,
  initialValue: PropTypes.string,
  data: PropTypes.array,
  content: PropTypes.object,
};

export default DefinitionPieChart;
