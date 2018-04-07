import React from 'react';
import styled from 'styled-components';
import { Header, Footer, StoryCard } from '@hackoregon/component-library';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';


const Container = styled.div`
  min-height: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
`;

const dataInc = [
      { name: 'Vehicle Incidents', Incidents: 49746 },
      { name: 'Bike Incidents', Incidents: 2844 },
      { name: 'Pedestrian Incidents', Incidents: 2327 },
];
const dataInj = [
      { name: 'Vehicle Serious Injury', Incidents: 4.42 },
      { name: 'Bike Serious Injury', Incidents: 8.12 },
      { name: 'Pedestrian Serious Injury', Incidents: 13.58 },
];
const dataFat = [
      { name: 'Vehicle Fatalities', Incidents: 0.42 },
      { name: 'Bike Fatalities', Incidents: 0.60 },
      { name: 'Pedestrian Fatalities', Incidents: 4.51 },
];
const dataAge = [
      { name: '0-15 years old', Incidents: 8 },
      { name: '16-30 years old', Incidents: 18 },
      { name: '31-45 years old', Incidents: 27 },
      { name: '46-60 years old', Incidents: 26 },
      { name: '61-75 years old', Incidents: 14 },
      { name: '75-100 years old', Incidents: 12 },
];
const dataTot = [
      // { name: 'Incidents by serverity', 'Incidents across all modes': 2135, 'Serious injuries across all modes': 123, 'Pedestrian fatalities': 105 },
      { name: 'Incidents by serverity', 'Incidents across all modes': 2135 },
      { name: 'Serious injuries across all modes', 'Serious injuries across all modes': 123 },
      { name: 'Pedestrian fatalities', 'Pedestrian fatalities': 105 },
];

function CrashData(props) {
  const captionStyle = {
    paddingLeft: '15%',
    paddingRight: '15%',
    marginBottom: '3em',
  };
  const chartCaption = {
    marginBottom: '3em',
  };

  return (

    <Container>

      <h1>How does the traffic fatality number breakdown across the different modes of transportation in Portland?</h1>

      <p>Hack Oregon partnered with the Portland Bureau of Transportation (PBOT) in support of the Vision Zero project. The mission of Vision Zero is to move Portland toward achieving zero traffic-related fatalities and serious injuries while providing safe and affordable transportation options and multiple opportunities for daily physical activity.
      </p>
      <p>In addition to our partnership with PBOT, we reached out to the Oregon Department of Transportation (ODOT) for the raw crash data* they have for the City of Portland (COP). They gave us a decade of crash data from 2004 through 2014, from which we were able to analyze how many traffic fatalities occurred in Portland across three modes of transportation - vehicle**, bike, and pedestrian. Here’s an overview of what we saw.
      </p>
      <StoryCard>
        <p style={{ marginTop: '2em' }}>Total number of incidents by mode of transportation for data from ODOT for the years 2004-2014</p>
        <LineChart width={600} height={300} data={dataInc} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <XAxis dataKey="name" />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Line type="monotone" dataKey="Incidents" stroke="#E87220" activeDot={{ r: 8 }} />
        </LineChart>
        <p style={captionStyle}>This is a breakdown of the total number of incidents by mode of transportation for data from ODOT for the years 2004-2014</p>
      </StoryCard>

      <StoryCard>
        <p style={{ marginTop: '2em' }}>Total number of serious injuries per mode of transportation</p>
        <LineChart width={600} height={300} data={dataInj} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <XAxis dataKey="name" />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Line type="monotone" dataKey="Incidents" stroke="#E87220" activeDot={{ r: 8 }} />
        </LineChart>
        <p style={captionStyle}>This is the percentage of serious injury*** per mode of transportation</p>
      </StoryCard>

      <StoryCard>
        <p style={{ marginTop: '2em' }}>Percentage of fatalities per mode of transportation</p>
        <LineChart width={600} height={300} data={dataFat} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <XAxis dataKey="name" />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Line type="monotone" dataKey="Incidents" stroke="#E87220" activeDot={{ r: 8 }} />
        </LineChart>
        <p style={captionStyle}>This is the percentage of fatalities per mode of transportation</p>
      </StoryCard>

      <div>
        <p>Data Set Notes:</p>
        <p>* When an accident occurs, the police create an accident report which is submitted to the Department of Motor Vehicles (DMV), which is then collected and submitted to the Oregon Department of Transportation (ODOT) - Crash Analysis and Reporting Unit where it is recorded and stored in their crash database for the entire state of Oregon.</p>
        <p>** “Motorcycles” are a separate category from “vehicles”, and are not included as a part of the  vehicle crash analysis numbers.</p>
        <p>***The serious injury category does not include fatalities.</p>
      </div>

      <h1>97 Intersections</h1>
      <StoryCard>
        <BarChart width={600} height={300} data={dataTot} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <XAxis dataKey="name" />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Bar barSize={75} dataKey="Pedestrian fatalities" fill="#aaa4ab" />
          <Bar barSize={75} dataKey="Serious injuries across all modes" fill="#ed8f4e" />
          <Bar barSize={75} dataKey="Incidents across all modes" fill="#E87220" />
        </BarChart>
        <p style={{ marginBottom: '2em' }}>This is how many total incidents by severity were reported at the 97 intersections</p>
      </StoryCard>


      <StoryCard>

        <p>Number of pedestrian fatalities by age distribution</p>
        <BarChart width={600} height={300} data={dataAge} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <XAxis dataKey="name" />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Bar dataKey="Incidents" fill="#E87220" />
        </BarChart>
      </StoryCard>

      <StoryCard>
        <h1>6 Repeat Offenders of Pedestrian Fatalities</h1>
        <p>Of the the 97 intersections where there were 105 pedestrian fatalities, there are 6 that have more than one reported incident of a pedestrian fatality.</p>
        <h2>Intersection: N Interstate + N Lombard</h2>
        <img alt={'Noth Intertate and North Lombard Intersection'} width={500} height={300} src={require('./../Transportation-Assets/NInterstate-NLombard.jpg')} />
        <p style={captionStyle}>This highly trafficked four light intersection includes a MAX light rail station and is surrounded by gas stations, restaurants, a major grocery store, and neighborhoods. It is well lit and has a posted speed limit of 35 mph. From 2004-2014 there were a total of 46 incidents reported across all modes of transportation* that involved 58 injuries, five serious injuries, and two pedestrian fatalities. In one of those pedestrian fatality incidents the pedestrian had a blood alcohol content (BAC) level** of 0.04%.</p>
        <h2>Intersection: SE Stark + SE 112th</h2>
        <img alt={'South East Stark and South East 112th Intersection'} width={500} height={300} src={require('./../Transportation-Assets/SEStark-SE112th.jpg')} />
        <p style={captionStyle}>The SE Stark & SE 112th intersection is in the Gateway neighborhood, one block away from a lighted pedestrian crosswalk and within walking distance of Ventura Park. It is well lit on one side of the road and the posted speed limit is 35 mph. From 2004-2014 there were a total of nine reported crash incidents across all modes of transportation*, resulting in 10 injuries and two pedestrian fatalities. In one of those pedestrian fatality incidents the driver involved had a BAC level** of 0.17%.</p>

        <h2>Intersection: NE Sandy + NE 91st</h2>
        <img alt={'North East Sandy and North East 91st Intersection'} width={500} height={300} src={require('./../Transportation-Assets/NESandy-NE91st.jpg')} />
        <p style={captionStyle}>Although there is a bus stop at the NE Sandy & NE 91st intersection, there is currently no designated pedestrian crosswalk across the five car lanes. It is surrounded by businesses, a market, and residential homes and has a posted speed limit of 35 mph. This intersection has streetlights on both sides of the road, but at night there is low visibility. From 2004-2014 there were a total of 10 reported crash incidents across all modes of transportation* at this intersection, resulting in nine injuries, one serious injury, and two pedestrian fatalities. In both pedestrian fatality incidents the pedestrians had a BAC level** of 0.42% and 0.30%, and the driver involved in one of the incidents had a BAC level** of 0.15%.</p>

        <h2>Intersection: Pacific HWY (15) + SB EF Williams</h2>
        <img alt={'Pacific Hightway 15 and SB EF Williams Intersection'} width={500} height={300} src={require('./../Transportation-Assets/PacificHWY-SBWilliams.jpg')} />
        <p style={captionStyle}>This intersection is a little different from the other five repeat offender intersections, because it is the southbound on-ramp to highway I5 from NE Williams street. This is a well lit area, with a posted speed limit of 50 mph. At this intersection there are three stoplights, a bike lane and is nested between the Hooper Detox Stabilization Center and Garden Garage which is attached to the Moda Center. The location makes it highly trafficked by vehicles, cyclist, and pedestrians. From 2004-2014 there were a total of 71 reported crash incidents across all modes of transportation* resulting in 100 injuries, six serious injuries, and two pedestrian fatalities. In one of the pedestrian fatality incidents the pedestrian had a BAC level** of 0.08%.</p>

        <h2>Intersection: SE Division + 156th</h2>
        <img alt={'South East Division and 156th Intersection'} width={500} height={300} src={require('./../Transportation-Assets/SEDivision-156th.jpg')} />
        <p style={captionStyle}>The SE Division & 156th intersection has a lighted pedestrian crosswalk, and is surrounded by businesses, residential homes, and bus stops in the Centennial neighborhood. The posted speed limit is 40 mph, and although there are street lights on one side of the road there is low visibility at night. From 2004-2014 there were a total of 26 reported crash incidents across all modes of transportation*, resulting 38 injuries, three being serious injuries, and two pedestrian fatalities. In one of the pedestrian fatality incidents the pedestrian had a BAC level** of 0.18%</p>

        <h2>Intersection: SE Foster + SE 80th</h2>
        <img alt={'South East Foster and 80th Intersection'} width={500} height={300} src={require('./../Transportation-Assets/SEFoster-SE80th.jpg')} />
        <p style={captionStyle}>At the SE Foster & SE 80th intersection there is a lighted pedestrian crosswalk, and is surrounded by businesses, restaurants, bus stops, and a major grocery store - making it a highly trafficked area. The posted speed limit is 35 mph and is well lit. From 2004-2014 there were a total of 36 reported crash incidents across all modes of transportation*, resulting 58 injuries, two being serious injuries, and two pedestrian fatalities. In one of the pedestrian fatality incidents the pedestrian had a BAC level** of  0.01%.</p>
        <br />
        <p>*For the purposes of this project, all modes of transportation include vehicle, bike, and pedestrian.</p>
        <p>** In the U.S. it is illegal to drive with a BAC level of 0.08% or more nationwide.</p>


      </StoryCard>

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
