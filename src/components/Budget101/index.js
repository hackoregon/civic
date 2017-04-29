import React from 'react';
import StoryCard from '@hackoregon/component-library/lib/StoryCard/StoryCard';

require('./Budget101.css');

function Budget101() {
  return (
    <div>
      <StoryCard title="Budget101" collectionId="" cardId="">
        <div id="LearnAbout">
          <h1>Learn about the budget</h1>
          <p>Donut biscut</p>
        </div>
        <div id="ServiceAreas">
          <h1>City of Portland Service Areas <br /> Budget for 2016-2017</h1>
          <p>Pie Chart</p>
        </div>
        <div id="TotalBudget">
          <h1>TotalBudget: Big Number</h1>
          <p>Donut biscut</p>
          <div style={{ display: 'flex', justifyContent: 'space-around', margin: 'auto' }} >
            <div className="col budgetSquare">
              <p>Budget amount</p>
              <p>Donut Donut</p>
            </div>
            <div className="col budgetSquare">
              <p>Budget amount</p>
              <p>Donut Donut</p>
            </div>
            <div className="col budgetSquare">
              <p>Budget amount</p>
              <p>Donut Donut</p>
            </div>
          </div>
        </div>
        <div id="7ServiceAreas">
          <h2>City Services are divided into 7 Service Areas</h2>
          <p>Donut biscut</p>
          <div style={{ display: 'flex', justifyContent: 'space-around', margin: 'auto' }} >
            <div className="col">
              <img alt="Public Safety icon" className="publicIcons" src={require('../../../assets/safety_budget101_icon.png')} />
              <p>Public <br /> Safety</p>
            </div>
            <div className="col">
              <img alt="Community Development icon" className="publicIcons" src={require('../../../assets/community_budget101_icon.png')} />
              <p>Community <br /> Development</p>
            </div>
            <div className="col">
              <img alt="Public Utilities icon" className="publicIcons" src={require('../../../assets/utilities_budget101_icon.png')} />
              <p>Public <br /> Utilities</p>
            </div>
            <div className="col">
              <img alt="City Support Services icon" className="publicIcons" src={require('../../../assets/support_budget101_icon.png')} />
              <p>City Support <br /> Services</p>
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-around', margin: 'auto' }} >
            <div className="col">
              <img alt="Transportation & Parking icon" size="25%" className="publicIcons" src={require('../../../assets/transportation_budget101_icon.png')} />
              <p>Transportation & <br /> Parking </p>
            </div>
            <div className="col">
              <img alt="Parks, Recreaction, & Culture icon" size="25%" className="publicIcons" src={require('../../../assets/parks_budget101_icon.png')} />
              <p>Parks, Recreaction, <br /> & Culture</p>
            </div>
            <div className="col">
              <img alt="Elected Officials icon" size="25%" className="publicIcons" src={require('../../../assets/officials_budget101_icon.png')} />
              <p>Elected <br /> Officials</p>
            </div>
          </div>
          <h2>Each Service Area is broken down into <br /> one or more Bureaus</h2>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div className="col">
              <img alt="Bureau Breakdown" className="breakdown" src={require('../../../assets/bureau_breakdown_budget101.png')} />
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div className="col">
              <img alt="Bureau Breakdown" className="arrows" src={require('../../../assets/arrow_budget101.png')} />
              <h2>Get Involved!</h2>
              <p>Donut Donut Donut </p>
            </div>
          </div>

        </div>

      </StoryCard>
    </div>
  );
}

export default Budget101;
