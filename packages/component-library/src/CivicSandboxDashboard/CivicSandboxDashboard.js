import React from 'react';
import PropTypes from 'prop-types';
import PieChart from '../PieChart/PieChart';
import HorizontalBarChart from '../HorizontalBarChart/HorizontalBarChart';
import { numeric, percentage } from '../utils/formatters';
import { css } from 'emotion';

const dashboard = css`
  background: rgba(255, 255, 255, 1.0);
  color: #000;
  width: 28%;
  min-height: 300px;
  max-height: 525px;
  position: absolute;
  top: 21%;
  left: 4%;
  display: flex;
  flex-direction: column;
  @media (max-width: 900px) {
    width: 100%;
    position: relative;
    left: 0;
    display: inline-block;
  }
`;

const contentContainer = css`
  position: relative;
  display: flex;
  flex-direction: column;
  margin-bottom: auto;
  overflow-y: auto;
  overflow-x: hidden;
`;

const watermarkContainer = css`
  position: absolute;
  left: 0;
  top: 0;
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
      children,
    } = this.props;

    const visualizations = data.map((object, index) => {
      return (
        object.visualizationType === "Text" ? (
          <div className={viz} key={index}>
            <h2>{ object.title }</h2>
            <p>{ object.data.toLocaleString() }</p>
          </div>
        ) : object.visualizationType === "PercentDonut" ? (
          <div className={viz} key={index}
            style={{"maxHeight": "500px", "overflowY": "hidden", "overflowX": "visible"}}>
            <h2>{ object.title }</h2>
            <h2 style={{"textAlign": "center", "margin": "auto", "width": "50%"}}>
              { object.data[0].y < 1 ? percentage(object.data[0].y) :
                object.data[0].y.toFixed(1) + "%"
              }
            </h2>
            <PieChart
              data={object.data}
              colors={["#19b7aa","#a9a9a9"]}
              width={475}
              height={375}
              innerRadius={90}
              halfDoughnut={true}
            />
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
      <div className={dashboard}>
        <div className={contentContainer}>
          { this.state.show === "info" ? children : visualizations }
        </div>
        <div className={watermarkContainer}>
          <svg width="134" height="135" xmlns="http://www.w3.org/2000/svg">
            <g fill="none" fillRule="evenodd">
              <path d="M0 134.658V0l11.566 11.597v123.061H0z" fill="#191119" />
              <path d="M133.864 0v11.597H11.566v.008L0 .008V0h133.864z" fill="#DC4556" />
            </g>
          </svg>
        </div>
        { children ? buttons : null }
      </div>
    );
  }
}

CivicDashboard.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
  children: PropTypes.node,
};

export default CivicDashboard;
