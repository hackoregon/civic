import React from 'react';
import styled from 'styled-components';
import Header from '@hackoregon/component-library/lib/Navigation/Header';
import Footer from '@hackoregon/component-library/lib/Footer/Footer';
import StoryCard from '@hackoregon/component-library/lib/StoryCard/StoryCard';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';


const Container = styled.div`
  min-height: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
`;

const dataInc = [
      { name: 'Vehicle Incidents', Amount: 49746 },
      { name: 'Bike Incidents', Amount: 2844 },
      { name: 'Pedestrian Incidents', Amount: 2327 },
];
const dataInj = [
      { name: 'Vehicle Serious Injury', Amount: 4.42 },
      { name: 'Bike Serious Injury', Amount: 8.12 },
      { name: 'Pedestrian Serious Injury', Amount: 13.58 },
];
const dataFat = [
      { name: 'Vehicle Fatalities', Amount: 0.42 },
      { name: 'Bike Fatalities', Amount: 0.60 },
      { name: 'Pedestrian Fatalities', Amount: 4.51 },
];
const dataAge = [
      { name: '0-15 years old', Amount: 8 },
      { name: '16-30 years old', Amount: 18 },
      { name: '31-45 years old', Amount: 27 },
      { name: '46-60 years old', Amount: 26 },
      { name: '61-75 years old', Amount: 14 },
      { name: '75-100 years old', Amount: 12 },
];

function CrashData(props) {
  return (
    <Container>
      <Header />

      <StoryCard>
        <p>Total number of incidents by mode of transportation for data from ODOT for the years 2004-2014</p>
        <LineChart width={600} height={300} data={dataInc} margin={{top: 5, right: 30, left: 20, bottom: 5}}>
          <XAxis dataKey="name" />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="Amount" stroke="#E87220" activeDot={{ r: 8 }} />
        </LineChart>
      </StoryCard>

      <StoryCard>
        <p>Total number of serious injuries per mode of transportation</p>
        <LineChart width={600} height={300} data={dataInj} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <XAxis dataKey="name" />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="Amount" stroke="#E87220" activeDot={{ r: 8 }} />
        </LineChart>
      </StoryCard>

      <StoryCard>
        <p>Percentage of fatalities per mode of transportation</p>
        <LineChart width={600} height={300} data={dataFat} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <XAxis dataKey="name" />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="Amount" stroke="#E87220" activeDot={{ r: 8 }} />
        </LineChart>
      </StoryCard>

      <StoryCard>
        <p>Number of pedestrian fatalities by age distribution</p>
        <BarChart width={600} height={300} data={dataAge} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <XAxis dataKey="name" />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Legend />
          <Bar dataKey="Amount" fill="#E87220" />
        </BarChart>
      </StoryCard>

      <StoryCard>
        <h1>6 Repeat Offenders from the Pedestrian Lens</h1>
        <p>Of the the 97 intersections where there were 105 pedestrian fatalities, there are 6 that have more than one reported incident of a pedestrian fatality.</p>
        <h2>Intersection: N Interstate + N Lombard</h2>
        <img alt={'Noth Intertate and North Lombard Intersection'} width={500} height={300} src={require('./../Transportation-Assets/NInterstate-NLombard.JPG')} />

        <h2>Intersection: SE Stark + SE 112th</h2>
        <img alt={'South East Stark and South East 112th Intersection'} width={500} height={300} src={require('./../Transportation-Assets/SEStark-SE112th.JPG')} />

        <h2>Intersection: NE Sandy + NE 91st</h2>
        <img alt={'North East Sandy and North East 91st Intersection'} width={500} height={300} src={require('./../Transportation-Assets/NESandy-NE91st.JPG')} />

        <h2>Intersection: Pacific HWY (15) + SB EF Williams</h2>
        <img alt={'Pacific Hightway 15 and SB EF Williams Intersection'} width={500} height={300} src={require('./../Transportation-Assets/PacificHWY-SBWilliams.JPG')} />

        <h2>Intersection: SE Division + 156th</h2>
        <img alt={'South East Division and 156th Intersection'} width={500} height={300} src={require('./../Transportation-Assets/SEDivision-156th.JPG')} />

        <h2>Intersection: SE Foster + SE 80th</h2>


      </StoryCard>
      <Footer />
      {React.Children.toArray(props.children)}
    </Container>
  );
}

CrashData.displayName = 'CrashData';
CrashData.defaultProps = {
  children: <div />,
};

CrashData.propTypes = {
  children: React.PropTypes.node,
};

export default CrashData;
