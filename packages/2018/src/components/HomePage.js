import React from 'react';
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
} from '@hackoregon/component-library/src/utils/formatters';
import {
  magnitudeOfUrbanCampsiteSweeps,
  proactivePlanning,
  selectedCityRank,
  chartData,
} from '../assets/homePageData';

const titleStyle = css`
  font-size: 64px;
  line-height: 1.2;
  font-weight: 300;
  font-family: 'Rubik', sans-serif;
  margin-bottom: 24px;
`;

const contentContainer = css`
  padding: 48px;
`;

const emphasis = css`
  color: #000;
`;

const gradientLabel = css`
  ${emphasis}
  position: relative;
  bottom: -10px;
  @media (max-width: 640px) {
    bottom: -5px;
  }
`;

const cardCarousel = css`
  padding: 100px 0px;
  display: flex;
  width: 100%;
`;

const centeredStoryCard = css`
  display: block;
  transform: scale(1.5);
  z-index: 100000;
  background-color: white;
`;

const storyCard = css`
  display: block;
  transform: scale(1);
`;

const smallestStoryCard = css`
  display: block;
  transform: scale(0.6);
`;

const issues = [
  'Homelessness',
  'Disaster Resilience',
  'Affordable Housing',
  'Transportation',
  'Neighborhoods',
];

class HomePage extends React.Component {
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
            <i>{issues[this.state.slideIndex]}</i>
          </h2>
          <Carousel
            autoplay
            wrapAround
            withoutControls
            cellSpacing={20}
            slideIndex={this.state.slideIndex}
            afterSlide={slideIndex => this.setState({ slideIndex })}
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
                {selectedCityRank && (
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
                )}
              </section>
              {chartData && (
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
              )}
            </CivicStoryCard>
          </Carousel>
          <Button>EXPLORE CIVIC ✨🚀✨</Button>
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
