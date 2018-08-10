import React from 'react';
import { css } from 'emotion';
import { Link } from 'react-router';

const collectionPageWrapper = css`
  position: relative;
  display: block;
  width: 100%;
  overflow-y: hidden;
  h1 {
    width: 400px;
    display: inline-block;
    font-size: 80px;
    line-height: 1.2;
    letter-spacing: -1px;
    font-weight: 400;
    margin: 0 0 20px;
    font-family: 'Rubik', sans-serif;

    @media (max-width: 1024px) {
      font-size: 60px;
    }
  }
`;

const leftContainer = css`
  position: fixed;
  width: 60%;
  padding: 60px;
  left: 0;
  box-sizing: border-box;

  @media (max-width: 850px) {
    position: relative;
    width: 100%;
    padding: 24px 36px;
  }
`;

const subCopy = css`
  position: relative;
  display: block;
  font-family: 'Rubik',sans-serif;
  font-size: 18px;
  line-height: 1.7;
  margin: 20px 0;
  color: black;
  letter-spacing: auto;


  @media (max-width: 1024px) {
    font-size: 16px;
  }
`;

const teamTitleStyle = css`
  display: block;
  font-size: 13px;
  font-family: 'Rubik';
  text-transform: uppercase;
  letter-spacing: 3px;
`;

const itemStyle = css`
  background-color: #FFFFFF;
  h2, h3 {
    color: black;
  }
`;

const sideListWrapper = css`
  display: block;
  position: relative;
  margin-top: 60px;
  margin-left: 50%;

  @media (max-width: 850px) {
    margin-left: 0;
    margin-top: 0;
  }

  ul {
    padding: 20px
    margin: 60px 0 0 0;
    list-style: none;
    width: 40vw;
    height: 100vh;
    background-color: white;
    min-width: 320px;
    overflow-y: scroll;

    @media (max-width: 850px) {
      width: 100%;
      overflow-y: auto;
      height: auto;
    }
  }

  li {
    width: 90%;
    height: 180px;
    padding: 20px 36px;
    margin: 0 0 20px 0;
    box-sizing: border-box;
    font-family: 'Rubik', sans-serif;
    font-size: 25px;
    text-decoration: none;
    border: none;
    transition: opacity .4s ease-in-out;
    border: 1px solid #DDD;
    border-radius: 2px;
    box-shadow: 5px 5px 15px -3px rgba(0,0,0,0.2);

    p {
      color: black;
      font-family: 'Rubik', sans-serif;
      font-size: 30px;
      text-align: center;
    }

    :hover {
      opacity: 0.8;
    }


  }
`;


const homeLink = css`
  width: 100px;
  margin-bottom: 20px;

  a {
    border: none;
  }
`;


const PortlandCollectionPage = () => (
  <div className={ collectionPageWrapper }>
    <div className={ leftContainer }>
      <div className={ homeLink }><Link to="/"><img src={require(`../assets/civic-logo-animated.svg`)} /></Link></div>
      <h1>Portland Collections</h1>
      <div className={ subCopy }>
        Portland Collections are built by teams of volunteers who are passionate about showing the visual side of data to impact community awareness.
      </div>
    </div>
    <div className={ sideListWrapper }>
      <ul>
        <Link to="/sandbox"><li className={itemStyle}><div className={teamTitleStyle}>Sandbox</div><h2>Explore Interactive Maps from Portland Collections</h2></li></Link>
        <Link to="/cities/portland/disaster"><li className={itemStyle}><div className={teamTitleStyle}>Disaster Resilience</div><h2>Assessing Risk and Prioritizing Action to Strengthen Resilience in the Face of a Natural Disaster</h2></li></Link>
        <Link to="/cities/portland/elections"><li className={itemStyle}><div className={teamTitleStyle}>Local Elections</div><h2>Quantifying Influence and Understanding the Impact of Money in our Political System</h2></li></Link>
        <Link to="/cities/portland/housing"><li className={itemStyle}><div className={teamTitleStyle}>Housing Affordability</div><h2>Synthesizing Complex Information to Better Understand Affordable Housing Trends and Policy Dynamics</h2></li></Link>
        <Link to="/cities/portland/neighborhood"><li className={itemStyle}><div className={teamTitleStyle}>Neighborhood Development</div><h2>Examining Local Patterns, Movement, and Our Sense of Place</h2></li></Link>
        <Link to="/cities/portland/transportation"><li className={itemStyle}><div className={teamTitleStyle}>Transportation Systems</div><h2>Identifying Opportunities for Equitable Mobility in Cities</h2></li></Link>
      </ul>
    </div>
  </div>
);

PortlandCollectionPage.displayName = 'PortlandCollectionPage';

export default PortlandCollectionPage;
