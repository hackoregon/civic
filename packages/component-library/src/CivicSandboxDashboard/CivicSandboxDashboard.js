import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'emotion';
import PieChart from '../PieChart/PieChart';
import HorizontalBarChart from '../HorizontalBarChart/HorizontalBarChart';
import CivicWatermark from '../CivicWatermark/CivicWatermark';
import { numeric, percentage } from '../utils/formatters';

const dashboard = css`
  background: rgba(255, 255, 255, 1.0);
  color: #000;
  border: 1px solid #DDD;
  border-radius: 2px;
  box-shadow: 5px 5px 15px -3px rgba(0,0,0,0.2);
`;

const contentContainer = css`
  position: relative;
  display: flex;
  flex-direction: column;
  margin-bottom: auto;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 10px;
`;

const viz = css`
  width: 90%;
  margin: 1% 2% 2% 7.5%;
`;

const buttonContainer = css`
  position: relative;
  display: flex;
  flex-direction: row;
  width: 100%;
`;

const icon = css`
  text-align: center;
  border: 1px solid lightGray;
  background-color: #f0f0f0;
  color: dimGray;
  font-size: 20px;
  height: 98%;
  width: 50%;
  margin: 0 auto;
`;

const iconActive = css`
  text-align: center;
  border: 1px solid lightGray;
  background-color: #f0f0f0;
  color: #dc4556;
  font-size: 20px;
  height: 98%;
  width: 50%;
  margin: 0 auto;
`;

const donutChart = css`
  width: 90%;
  margin: 1% 2% 2% 7.5%;
  height: 75%;
  overflow-y: hidden;
  @media(max-width: 900px) {
    max-height: 400px;
  }
`;

const donutPercentage = css`
  text-align: center;
  margin: -30px auto 0 auto;
`;

class CivicDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: "viz",
    };

    this.showInfo = this.showInfo.bind(this);
    this.showViz = this.showViz.bind(this);
  }

  showInfo() {
    this.setState({
      show: "info",
    });
  }

  showViz() {
    this.setState({
      show: "viz",
    });
  }

  render() {
    const {
      data,
      height,
      children,
    } = this.props;

    const containerHeight = height ? css`min-height: ${height}px;` : css``;

    const visualizations = data.map((object, index) => {
      return (
        object.visualizationType === "Text" ? (
          <div className={viz} key={index}>
            <h2>{ object.title }</h2>
            <p>{ object.data.toLocaleString() }</p>
          </div>
        ) : object.visualizationType === "PercentDonut" ? (
          <div className={donutChart} key={index}>
            <h2>{ object.title }</h2>
            <PieChart
              data={object.data}
              colors={["#19b7aa","#a9a9a9"]}
              width={475}
              height={375}
              innerRadius={90}
              halfDoughnut={true}
            />
            <h2 className={donutPercentage}>
              { object.data[0].y < 1 ? percentage(object.data[0].y) :
                object.data[0].y.toFixed(1) + "%"
              }
            </h2>
          </div>
        ) : object.visualizationType === "ComparisonBar" ? (
          <div className={viz} key={index}>
            <h2>{ object.title }</h2>
            <HorizontalBarChart
              minimalist={object.minimalist}
              data={object.data}
              sortOrder={object.sortOrder}
              dataValue={object.dataValue}
              dataLabel={object.dataLabel}
              dataKeyLabel={""}
              title={""}
              subtitle={""}
              xLabel={""}
              yLabel={""}
            />
          </div>
        ) : object.visualizationType === "Legend" ? (
          <div className={viz} key={index}>
            <h2>{ object.title }</h2>
            <div style={{"display": "flex", "flexDirection": "row"}}>
              {
                object.colors.map((d,i,arr) => {
                  return (
                    <div style={{"background": d, "height": "40px", "width": `${100/arr.length}%`}} key={"legend" + i}>
                    </div>
                  );
                })
              }
            </div>
            <div>
              <h4 style={{"float": "left"}}>
                {
                  object.min === 0 ? 0 :
                  object.min > 0 && object.min < 1 ? percentage(object.min) :
                  object.min > 1 ? numeric(object.min) :
                  object.min
                }
              </h4>
              <h4 style={{"float": "right"}}>
                {
                  object.max < 1 && object.max > 0 ? percentage(object.max) :
                  object.max > 1 ? numeric(object.max) :
                  object.max
                }
              </h4>
            </div>
          </div>
        ) : null
      );
    });

    const buttons = (
      <div className={buttonContainer}>
        <div className={this.state.show === "info" ? iconActive : icon} onClick={this.showInfo}>
          <div className={"fa fa-info-circle"}></div>
        </div>
        <div className={this.state.show === "viz" ? iconActive : icon} onClick={this.showViz}>
          <div className={"fa fa-eye"}></div>
        </div>
      </div>
    );

    return (
      <div className={css`${dashboard} ${containerHeight}`}>
        <div className={contentContainer}>
          { this.state.show === "info" ? children : visualizations }
        </div>
        <CivicWatermark />
        { children ? buttons : null }
      </div>
    );
  }
}

CivicDashboard.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
  height: PropTypes.number,
  children: PropTypes.node,
};

export default CivicDashboard;
