import React from 'react';
import styled from 'styled-components';
import Header from '@hackoregon/component-library/lib/Navigation/Header';
import Footer from '@hackoregon/component-library/lib/Footer/Footer';
import StoryCard from '@hackoregon/component-library/lib/StoryCard/StoryCard';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, RadialBarChart, RadialBar } from 'recharts';


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
      { name: 'Vehicle Serious Injury', Amount: 2107, 'Total Incidents by Type': 49746 },
      { name: 'Bike Serious Injury', Amount: 231, 'Total Incidents by Type': 2844 },
      { name: 'Pedestrian Serious Injury', Amount: 316, 'Total Incidents by Type': 2844 },
];
const dataFat = [
      { name: 'Pedestrian Fatalities 13 - 16 years old', uv: 30, fill: '#8884d8' },
      { name: 'Total Pedestrian Fatalities', uv: 105, fill: '#83a6ed' },
      { name: 'Total Number of Serious Injuries Across All Modes', uv: 123, fill: '#8dd1e1' },
      { name: 'Total Number of Incidents Across All Modes', uv: 2135, fill: '#82ca9d' },
];

function CrashData(props) {
  return (
    <Container>
      <Header />
      <StoryCard>
      <BarChart width={600} height={300} data={dataInc} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <XAxis dataKey="name" />
        <YAxis />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Bar dataKey="Amount" fill="#82ca9d" />
      </BarChart>
      <p>Breakdown of the total number of incidents by mode of transportation for data from ODOT for the years 2004-2014</p>
      <BarChart width={600} height={300} data={dataInj} margin={{top: 20, right: 30, left: 20, bottom: 5}}>
        <XAxis dataKey="name" />
        <YAxis />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Legend />
        <Bar dataKey="Amount" stackId="a" fill="#8884d8" />
        <Bar dataKey="Total Incidents by Type" stackId="a" fill="#82ca9d" />
      </BarChart>
      <p>Percentage of fatalities per mode of transportation</p>
      <RadialBarChart width={500} height={300} cx={150} cy={150} innerRadius={20} outerRadius={140} barSize={20} data={dataFat}>
        <RadialBar minAngle={15} label background clockWise={true} dataKey='uv' />
        <Legend iconSize={10} width={300} height={140} layout="vertical" verticalAlign="bottom" />
      </RadialBarChart>
      <h1>6 Repeat Offenders from the Pedestrian Lens</h1>
      <p>Of the the 97 intersections where there were 105 pedestrian fatalities, there are 6 that have more than one reported incident of a pedestrian fatality.</p>
      <img with={500} height={300} src={require('./NInterstate-NLombard.JPG')} />
        <h2>Intersection: N Interstate + N Lombard</h2>
        <ul>
          <li>Total number of incidents: 46</li>
          <li>Total injuries: 58</li>
          <li>Total serious injuries: 5</li>
          <li>Total Fatalities: 2</li>
        </ul>
        <h2>Closer Look at Crash Environment for Fatalities:</h2>
        <ul>
          <li>Incident time: 10 pm, 11 am</li>
          <li>Road Surface Condition: wet, dry</li>
          <li>Age person killed: 82, 1</li>
          <li>Alcohol: True (Ped - .04), False</li>
          <li>Speed Limit: 35</li>
          <li>Streetlights: Yes</li>
        </ul>
        <img with={500} height={300} src={require('./NInterstate-NLombard.JPG')} />
          <h2>Intersection: N Interstate + N Lombard</h2>
          <ul>
            <li>Total number of incidents: 46</li>
            <li>Total injuries: 58</li>
            <li>Total serious injuries: 5</li>
            <li>Total Fatalities: 2</li>
          </ul>
          <h2>Closer Look at Crash Environment for Fatalities:</h2>
          <ul>
            <li>Incident time: 10 pm, 11 am</li>
            <li>Road Surface Condition: wet, dry</li>
            <li>Age person killed: 82, 1</li>
            <li>Alcohol: True (Ped - .04), False</li>
            <li>Speed Limit: 35</li>
            <li>Streetlights: Yes</li>
          </ul>
          <img with={500} height={300} src={require('./NInterstate-NLombard.JPG')} />
            <h2>Intersection: N Interstate + N Lombard</h2>
            <ul>
              <li>Total number of incidents: 46</li>
              <li>Total injuries: 58</li>
              <li>Total serious injuries: 5</li>
              <li>Total Fatalities: 2</li>
            </ul>
            <h2>Closer Look at Crash Environment for Fatalities:</h2>
            <ul>
              <li>Incident time: 10 pm, 11 am</li>
              <li>Road Surface Condition: wet, dry</li>
              <li>Age person killed: 82, 1</li>
              <li>Alcohol: True (Ped - .04), False</li>
              <li>Speed Limit: 35</li>
              <li>Streetlights: Yes</li>
            </ul>
            <img with={500} height={300} src={require('./NInterstate-NLombard.JPG')} />
              <h2>Intersection: N Interstate + N Lombard</h2>
              <ul>
                <li>Total number of incidents: 46</li>
                <li>Total injuries: 58</li>
                <li>Total serious injuries: 5</li>
                <li>Total Fatalities: 2</li>
              </ul>
              <h2>Closer Look at Crash Environment for Fatalities:</h2>
              <ul>
                <li>Incident time: 10 pm, 11 am</li>
                <li>Road Surface Condition: wet, dry</li>
                <li>Age person killed: 82, 1</li>
                <li>Alcohol: True (Ped - .04), False</li>
                <li>Speed Limit: 35</li>
                <li>Streetlights: Yes</li>
              </ul>
              <img with={500} height={300} src={require('./NInterstate-NLombard.JPG')} />
                <h2>Intersection: N Interstate + N Lombard</h2>
                <ul>
                  <li>Total number of incidents: 46</li>
                  <li>Total injuries: 58</li>
                  <li>Total serious injuries: 5</li>
                  <li>Total Fatalities: 2</li>
                </ul>
                <h2>Closer Look at Crash Environment for Fatalities:</h2>
                <ul>
                  <li>Incident time: 10 pm, 11 am</li>
                  <li>Road Surface Condition: wet, dry</li>
                  <li>Age person killed: 82, 1</li>
                  <li>Alcohol: True (Ped - .04), False</li>
                  <li>Speed Limit: 35</li>
                  <li>Streetlights: Yes</li>
                </ul>
                <img with={500} height={300} src={require('./NInterstate-NLombard.JPG')} />
                  <h2>Intersection: N Interstate + N Lombard</h2>
                  <ul>
                    <li>Total number of incidents: 46</li>
                    <li>Total injuries: 58</li>
                    <li>Total serious injuries: 5</li>
                    <li>Total Fatalities: 2</li>
                  </ul>
                  <h2>Closer Look at Crash Environment for Fatalities:</h2>
                  <ul>
                    <li>Incident time: 10 pm, 11 am</li>
                    <li>Road Surface Condition: wet, dry</li>
                    <li>Age person killed: 82, 1</li>
                    <li>Alcohol: True (Ped - .04), False</li>
                    <li>Speed Limit: 35</li>
                    <li>Streetlights: Yes</li>
                  </ul>
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
