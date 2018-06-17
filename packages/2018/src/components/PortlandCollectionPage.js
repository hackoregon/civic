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

  @media (max-width: 1024px) {
    font-size: 16px;
  }
`;

const disasterStyle = css`
  background-color: #DC4556;
`;
const electionsStyle = css`
  background-color: #19B7AA;
`;
const housingStyle = css`
  background-color: #1E62BD;
`;
const neighborhoodStyle = css`
  background-color: #721D72;
`;
const transporationStyle = css`
  background-color: #FFB226;
`;

const sideListWrapper = css`
  display: block;
  position: relative;
  margin-left: 60%;

  @media (max-width: 850px) {
    margin-left: 0;
  }

  ul {
    padding: 0;
    margin: 0;
    list-style: none;
    width: 40vw;
    height: 100vh;
    background-color: black;
    min-width: 320px;
    overflow-y: scroll;

    @media (max-width: 850px) {
      width: 100%;
      overflow-y: auto;
      height: auto;
    }
  }

  li {
    width: 100%;
    height: 180px;
    padding: 20px 20px;
    box-sizing: border-box;
    color: white;
    font-family: 'Rubik', sans-serif;
    font-size: 25px;
    letter-spacing: -1px;
    text-decoration: none;
    border: none;
    transition: opacity .4s ease-in-out;

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
        Powder cookie sweet roll chupa chups marzipan jelly dessert. Jelly-o ice cream wafer. Pudding marshmallow sweet apple pie biscuit cheesecake powder. Jelly toffee macaroon lemon drops sweet roll candy canes.
      </div>
      <div className={ subCopy }>
        Portland Collections are built by teams of volunteers who are passionate about showing the visual side of data to impact community awareness.
      </div>
      <div className={ subCopy }>
        <Link to="/sandbox">View Sandbox</Link>
      </div>
    </div>
    <div className={ sideListWrapper }>
      <ul>
        <Link to="/cities/portland/disaster"><li className={disasterStyle}>Disaster Resilience</li></Link>
        <Link to="/cities/portland/elections"><li className={electionsStyle}>Local Elections</li></Link>
        <Link to="/cities/portland/housing"><li className={housingStyle}>Housing Affordability</li></Link>
        <Link to="/cities/portland/neighborhood"><li className={neighborhoodStyle}>Neighborhood Development</li></Link>
        <Link to="/cities/portland/transportation"><li className={transporationStyle}>Transportation Systems</li></Link>
      </ul>
    </div>
  </div>
);

PortlandCollectionPage.displayName = 'PortlandCollectionPage';

export default PortlandCollectionPage;
