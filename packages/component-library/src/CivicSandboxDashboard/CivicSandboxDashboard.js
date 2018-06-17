import React from 'react';
import PropTypes from 'prop-types';
import PieChart from '../PieChart/PieChart';
import HorizontalBarChart from '../HorizontalBarChart/HorizontalBarChart';

import { css } from 'emotion';

const dashboard = css`
  background: rgba(255, 255, 255, 1.0);
  color: #000;
  width: 22.5%;
  max-width: 350px;
  max-height: 475px;
  position: absolute;
  right: 4%;
  top: 1%;
  overflow-y: auto;
  pointer-events: auto;
  z-index: 4;
`;

const dashboardViz = css`
  margin: 0 0 0 7.5%;
`;

const watermarkContainer = css`
  position:absolute;
  left: 0;
  top: 0;
`;

const buttonContainer = css`
  background-color: #f0f0f0;
  display: flex;
  width: 100%;
`;

const icon = css`
  text-align: center;
  border: 1px solid lightGray;
  bottom: 0;
  color: dimGray;
  font-size: 20px;
  height: 15%;
  width: 50%;
`;

const iconActive = css`
  text-align: center;
  border: 1px solid lightGray;
  color: #dc4556;
  bottom: 0;
  font-size: 20px;
  height: 15%;
  width: 50%;
`;

class CivicDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: "info",
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
          <div className={dashboardViz} key={index}>
            <h2>{ object.title }</h2>
            <h1>{ object.data.toLocaleString() }</h1>
          </div>
        ) : object.visualizationType === "PieChart" ? (
          <div className={dashboardViz} key={index}>
            <h2>{ object.title }</h2>
            <div style={{ display: 'flex', justifyContent: 'space-around'}} >
              <PieChart
                data={object.data}
                colors={['#19b7aa','#a9a9a9']}
                width={450}
                height={350}
                innerRadius={90}
                halfDoughnut={true}
              />
            </div>
          </div>
        ) : object.visualizationType === "BarChart" ? (
          <div className={dashboardViz} key={index}>
            <h2>{ object.title }</h2>
              <HorizontalBarChart
                data={object.data}
                dataKey={"sortOrder"}
                dataValue={"value"}
                dataKeyLabel={""}
                title={""}
                subtitle={""}
                xLabel={""}
                yLabel={""}
              />
          </div>
        ) : null
      );
    });

    const content = this.state.show === "info" ? children : visualizations;

    return (
      <div className={dashboard}>
        <div>
          <div className={watermarkContainer}>
            <svg width="134" height="135" xmlns="http://www.w3.org/2000/svg">
              <g fill="none" fillRule="evenodd">
                <path d="M0 134.658V0l11.566 11.597v123.061H0z" fill="#191119" />
                <path d="M133.864 0v11.597H11.566v.008L0 .008V0h133.864z" fill="#DC4556" />
              </g>
            </svg>
          </div>
        </div>
        <div>
          { content }
        </div>
        <div className={buttonContainer}>
          <div className={this.state.show === "info" ? iconActive : icon} onClick={this.showInfo}>
            <span className={"fa fa-info-circle"}></span>
          </div>
          <div className={this.state.show === "viz" ? iconActive : icon} onClick={this.showViz}>
            <span className={"fa fa-eye"}></span>
          </div>
        </div>
      </div>
    );
  }
}

CivicDashboard.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
  children: PropTypes.node,
};

export default CivicDashboard;
