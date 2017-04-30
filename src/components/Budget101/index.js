import React from 'react';
import StoryCard from '@hackoregon/component-library/lib/StoryCard/StoryCard';
import PieChart from './PieChart';

require('./Budget101.css');
require('./stub.css');

function Budget101() {
  return (
    <StoryCard title="Budget101" collectionId="" cardId="">
      <div className="budget">
        <div id="LearnAbout">
          <h1>Learn about the budget</h1>
          <p>The City of Portland’s budget is broken into seven service areas,
          such as public safety or public utilities and are then further categorized by bureau.</p>
        </div>
        <div id="ServiceAreas">
          <h1>City of Portland Service Areas <br /> Budget for 2016-2017</h1>
          <div id="ServiceAreas" style={{ display: 'flex', justifyContent: 'space-around', margin: 'auto' }}>
            <div className="col">
              <PieChart />
            </div>
            <div className="col">
              <h2>Budget Resources</h2>
              <p>Where does the money come from?
                The City of Portland’s budget is funded through seven resources:
              </p>
              <ul className="resources">
                <li>30%  Beginning Fund Balance</li>
                <li>21%  Service Charges and Fees</li>
                <li>17%  Taxes</li>
                <li>15%  Bond and Note Proceeds</li>
                <li>8% Intergovernmental</li>
                <li>8% Licences & Permits</li>
                <li>1% Miscellaneous Sources</li>
              </ul>
            </div>
          </div>
          <h2>Total Budget: 4,283,586,753.00</h2>
          <p>Our budget breakdown reviews the Service Area component of the city budget.
          </p>
        </div>
        <div id="7ServiceAreas">
          <h2>City Services are divided into 7 Service Areas</h2>
          <p>Service Areas are 48.35% of the 2016-2017 City of Portland’s total
            budget and is comprised of 7 categories further broken down into bureaus.
            The seven service areas are Public Safety, Community Development, Public
            Utilities, City Support Services, Transportation & Parking, Parks,
            Recreation, & Culture, Elected Officials. Each Service Area is comprised
            of one or more bureaus. Continue reading for an example of how a service
            area is broken into bureaus.
          </p>
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
        </div>
        <div id="Breakdown">
          <h2>Each Service Area is broken down into <br /> one or more Bureaus</h2>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <img alt="Bureau Breakdown" className="breakdown" src={require('../../../assets/bureau_breakdown_budget101.png')} />
          </div>
        </div>
        <div id="GetInvolved">
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <img alt="Bureau Breakdown" className="arrows" src={require('../../../assets/arrow_budget101.png')} />
          </div>
          <div>
            <h2>Get Involved!</h2>
            <p>The Portland City Budget is not just a number. A Proposed Budget
                is developed over six months, and a final Adopted Budget is approved
                in June. At every stage, Portland’s citizens play an active role in
                shaping the budget. Learn how you can get invovled by visiting the
                City of Portland’s website.
            </p>
          </div>
        </div>
      </div>
    </StoryCard>
  );
}

export default Budget101;
