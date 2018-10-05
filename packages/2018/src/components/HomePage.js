import React, { Component } from 'react';
import Carousel from 'nuka-carousel';
import { Link } from 'react-router';
import { css } from 'emotion';
import {
  PageLayout,
  Button,
  CivicStoryCard,
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

const titleStyle = css`
  font-size: 50px;
  line-height: 1.2;
  font-weight: 300;
  font-family: 'Rubik', sans-serif;
  margin-bottom: 12px;
`;

const contentContainer = css`
  padding: 48px;
`;

const emphasis = css`
  color: #000;
`;

const gradientLabel = css`
  ${emphasis} position: relative;
  bottom: -10px;
  @media (max-width: 640px) {
    bottom: -5px;
  }
`;

const issueStyle = css`
  display: inline;
  color: #ee495c;
  font-weight: 500;
`;

const issues = [
  'Homelessness',
  'Disaster Resilience',
  'Affordable Housing',
  'Transportation',
  'Neighborhoods',
];

class HomePage extends Component {
  state = { slideIndex: 0 };

  render() {
    return (
      <PageLayout>
        <div className={contentContainer}>
          <div className={titleStyle}>
            Making Public Data
            <br />
            Public Knowledge
          </div>
          <h2>
            On the issues that matter most:{' '}
            <div className={issueStyle}>{issues[this.state.slideIndex]}</div>
          </h2>
          <Button>EXPLORE CIVIC ✨🚀✨</Button>
          <Carousel
            autoplay
            autoplayInterval={4000}
            wrapAround
            withoutControls
            speed={500}
            cellSpacing={20}
            afterSlide={slideIndex => this.setState({ slideIndex })}
            easing={'easeBack'}
            autoGenerateStyleTag={false}
            framePadding={'20px'}
          >
            <CivicStoryCard title="Magnitude of Urban Campsite Sweeps">
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
            </CivicStoryCard>
            <CivicStoryCard title="Proactive Planning For Citywide Resilience">
              <Scatterplot
                title="Resilience and Displacement"
                subtitle="Resilience as measured by census non-response rate and expected displacement in a 9.0 earthquake by neighborhood"
                data={proactivePlanning}
                xLabel="Census Non-Response Rate"
                yLabel="Per Capita Displacement"
                dataKey="census_response_rate"
                dataKeyLabel="resilienceLabel"
                dataValue="displaced_percap"
                dataValueLabel="displacementLabel"
                dataSeries="quadrant"
                size={{ key: 'total_population', minSize: 2, maxSize: 10 }}
                xNumberFormatter={percentage}
                yNumberFormatter={percentage}
              />
            </CivicStoryCard>
            <CivicStoryCard title="Rent Burdened Households">
              <section>
                <div>
                  <p>
                    <strong className={gradientLabel}>Less burdened</strong>
                    <GradientScale
                      domain={[1, selectedCityRank.total]}
                      primary={selectedCityRank.rank}
                      height={50}
                      colorScale="ocean"
                    />
                  </p>
                </div>
              </section>
              <section>
                <PieChart
                  title="Cost Burden Rates for Renters in 2015"
                  subtitle={'Portland-Vancouver-Hillsboro, OR-WA'}
                  data={chartData}
                  innerRadius={90}
                  dataLabel="label"
                  dataValue="value"
                />
              </section>
            </CivicStoryCard>

          </Carousel>
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
