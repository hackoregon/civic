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
import PagingDots from './PagingDots';
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
  background-image: url(https://previews.dropbox.com/p/thumb/AAOYBm53Mtbtaya0lADcAsWoWBJNlyNMdvt3m1i8dlZgujDYGBz66349riSzNqo0e5eVJ_u7nwVWsWXZaKKjs67W6HAr0C7RfbM_e4O_JW8cj9WsnpO-7Y-OEN0jo1R_g94XFmqfCXuKWwp8AgHloSo0noUYDRWACG05gDQuApdzmvpY7KIGuwr93rnuN2Sj4IlF3ZAqU2yWbt-JHAbGyX-NlWUSZ0GBfPUYiLX9zXEXJQ/p.png?size=1600x1200&size_mode=3);
`;

const buttonContainer = css`
  position: fixed;
  bottom: 10px;
  right: 35px;
`;

const carouselContainer = css``;

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

const issueStyle = index => css`
  font-size: 21px;
  line-height: 1.2;
  font-weight: 500;
  font-family: 'Rubik', sans-serif;
  margin-bottom: -20px;
  color: ${colors[index]};
  text-align: right;
  @media (max-width: 640px) {
    font-size: 18px;
  }
`;

class HomePage extends Component {
  state = { slideIndex: 0 };

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
          <div className={carouselContainer}>
            <Carousel
              autoplay
              autoplayInterval={4000}
              speed={1000}
              cellSpacing={300}
              afterSlide={slideIndex => this.setState({ slideIndex })}
              autoGenerateStyleTag={false}
              framePadding={'10px 0px'}
              renderTopCenterControls={props => <PagingDots {...props} />}
              renderCenterLeftControls={() => null}
              renderCenterRightControls={() => null}
              renderBottomCenterControls={() => null}
            >
              <div>
                <div className={issueStyle(0)}>Homelessness</div>
                <CivicStoryCard
                  footer={false}
                  title="Magnitude of Urban Campsite Sweeps"
                >
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
              </div>
              <div>
                <div className={issueStyle(1)}>Disaster Resilience</div>
                <CivicStoryCard
                  footer={false}
                  title="Proactive Planning For Citywide Resilience"
                >
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
              </div>
              <div>
                <div className={issueStyle(2)}>Affordable Housing</div>
                <CivicStoryCard footer={false} title="Rent Burdened Households">
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
              </div>
            </Carousel>
          </div>
          <div className={buttonContainer}>
            <Button>EXPLORE CIVIC ✨🚀✨</Button>
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
