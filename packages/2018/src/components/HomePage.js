import React, { Component } from 'react';
import { Link } from 'react-router';
import { css } from 'emotion';
import {
  PageLayout,
  Button,
  CivicStoryCard,
  CivicCardStack,
  BarChart,
  Scatterplot,
  GradientScale,
  PieChart,
} from '@hackoregon/component-library';
import {
  monthYear,
  percentage,
  year,
} from '@hackoregon/component-library/src/utils/formatters';
import {
  magnitudeOfUrbanCampsiteSweeps,
  proactivePlanning,
  selectedCityRank,
  chartData,
} from '../assets/homePageData';

const civicCategoricalColor1 = '#DC4556';
const civicCategoricalColor2 = '#19B7AA';
const civicCategoricalColor3 = '#1E62BD';
const civicCategoricalColor4 = '#721D7C';
const civicCategoricalColor5 = '#FFB226';

const colors = [
  civicCategoricalColor1,
  civicCategoricalColor2,
  civicCategoricalColor3,
  civicCategoricalColor4,
  civicCategoricalColor5,
];

const initialTextContainer = css`
  position: absolute;
  width: 100%;
  left: 0;
  top: 88px;
  min-height: 1000px;
  z-index: -1;
  mask-image: linear-gradient(to top, transparent 25%, black 240%);
`;

const buttonContainerStatic = css`
  padding: 8px 0;
`;

const titleStyle = css`
  font-size: 50px;
  line-height: 1.2;
  font-weight: 300;
  font-family: 'Rubik', sans-serif;
  @media (max-width: 640px) {
    font-size: 36px;
  }
`;

const subtitleStyle = css`
  font-size: 21px;
  line-height: 1.2;
  font-weight: 400;
  font-family: 'Rubik', sans-serif;
  color: #726371;
  @media (max-width: 640px) {
    font-size: 18px;
  }
`;

const contentContainer = css`
  padding: 25px 0;
  margin: 0 auto;
  max-width: 900px;
`;

const issueStyle = index => css`
  font-size: 21px;
  line-height: 0;
  font-weight: 500;
  font-family: 'Rubik', sans-serif;
  color: ${colors[index]};
  text-align: right;
  @media (max-width: 640px) {
    font-size: 18px;
  }
`;

const gridContainer = css`
  position: relative;
  display: grid;
  grid-template: 50% 50% / 50% 50%;
  row-gap: 20px;
  column-gap: 20px;
  padding: 40px 0 0 0;
  @media (max-width: 640px) {
    grid-template: 100% / 100%;
  }
`;

const gridItem = css`
  position: relative;
  width: 30vw;
  max-width: 400px;
  height: 25vw;
  max-height: 300px;
  @media (max-width: 640px) {
    width: 100%;
    height: 70vw;
  }
`;

const chartWrapper = css`
`;

const sampleChart = (
  <div className={chartWrapper}>
    <BarChart
      data={magnitudeOfUrbanCampsiteSweeps}
      xLabel="Month"
      yLabel="Sweeps"
      dataKey="date"
      dataValue="count"
      xNumberFormatter={monthYear}
    />
  </div>
);

class HomePage extends Component {
  render() {
    return (
      <PageLayout>
        <div className={contentContainer}>
          <div className={initialTextContainer} />
          <div className={titleStyle}>
            Making Public Data
            <br />
            Public Knowledge
          </div>
          <div className={subtitleStyle}>For issues that matter</div>
          <div className={buttonContainerStatic}>
            <Button>EXPLORE CIVIC ✨🚀✨</Button>
          </div>
          <div className={gridContainer}>
            <div className={gridItem}>
              <div className={issueStyle(1)}>Homelessness</div>
              <CivicCardStack cards={5}>{sampleChart}</CivicCardStack>
            </div>
            <div className={gridItem}>
              <div className={issueStyle(2)}>Disaster Resilience</div>
              <CivicCardStack cards={5}>
                <div className={chartWrapper}>
                  <Scatterplot
                    data={proactivePlanning}
                    xLabel="Census Non-Response Rate"
                    yLabel="Per Capita Displacement"
                    dataKey="census_response_rate"
                    dataKeyLabel="resilienceLabel"
                    dataValue="displaced_percap"
                    dataValueLabel="displacementLabel"
                    size={{ key: 'total_population', minSize: 2, maxSize: 10 }}
                    xNumberFormatter={percentage}
                    yNumberFormatter={percentage}
                  />
                </div>
              </CivicCardStack>
            </div>
            <div className={gridItem}>
              <div className={issueStyle(3)}>Affordable Housing</div>
              <CivicCardStack cards={5}>{sampleChart}</CivicCardStack>
            </div>
            <div className={gridItem}>
              <div className={issueStyle(4)}>Transportation</div>
              <CivicCardStack cards={5}>{sampleChart}</CivicCardStack>
            </div>
          </div>
          <h1>
            CIVIC is an art project that could transform the way that we use
            information, and an offering to the benevolent overlords.
          </h1>
        </div>
      </PageLayout>
    );
  }
}

HomePage.displayName = 'HomePage';

export default HomePage;
