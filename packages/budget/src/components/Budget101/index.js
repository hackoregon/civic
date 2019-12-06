import React from "react";
import { CivicStoryCard } from "@hackoregon/component-library";
import PieChart from "./PieChart";
import DataTable from "./DataTable";

import "./Budget101.css";
import "./stub.css";

function Budget101() {
  return (
    <CivicStoryCard watermark={<div />} footer={false} title="Budget 101">
      <div className="budget">
        <div id="LearnAbout">
          <h1 className="greenText">Learn about the budget</h1>
          <p>
            The City of Portland’s budget is broken into seven service areas,
            such as public safety or public utilities and are further
            categorized by bureau. Each bureau is then broken into a number of
            specific programs.
          </p>
        </div>
        <div id="ServiceAreas">
          <h1 className="greenText">
            City of Portland Service Areas <br /> Budget for 2016-2017
          </h1>
          <h2>Budget Resources</h2>
          <p>
            Where does the money come from? The City of Portland’s budget is
            funded through seven resources:
          </p>
          <div style={{ display: "flex", justifyContent: "space-around" }}>
            <PieChart />
            <div className="xcol">
              <DataTable />
            </div>
          </div>
          <h2 className="greenText">Total Budget: $4,283,586,753</h2>
          <p>
            Our budget breakdown reviews the Service Area component of the city
            budget.
          </p>
        </div>
        <div id="SevenAreas">
          <h2>
            City Services are divided into{" "}
            <span className="greenText">7 Service Areas</span>
          </h2>
          <p>
            Service Areas are 48.35% of the 2016-2017 City of Portland’s total
            budget and is comprised of 7 categories further broken down into
            bureaus. The seven service areas are Public Safety, Community
            Development, Public Utilities, City Support Services, Transportation
            & Parking, Parks, Recreation, & Culture, Elected Officials. Each
            Service Area is comprised of one or more bureaus. Continue reading
            for an example of how a service area is broken into bureaus.
          </p>
          <div style={{ display: "flex", justifyContent: "space-around" }}>
            <div className="col">
              <img
                alt="Public Safety icon"
                className="publicIcons"
                src={require("../../../assets/safety_budget101_icon.png")}
              />
              <p style={{ textAlign: "center" }}>
                Public <br /> Safety
              </p>
            </div>
            <div className="col">
              <img
                alt="Community Development icon"
                className="publicIcons"
                src={require("../../../assets/community_budget101_icon.png")}
              />
              <p style={{ textAlign: "center" }}>
                Community <br /> Development
              </p>
            </div>
            <div className="col">
              <img
                alt="Public Utilities icon"
                className="publicIcons"
                src={require("../../../assets/utilities_budget101_icon.png")}
              />
              <p style={{ textAlign: "center" }}>
                Public <br /> Utilities
              </p>
            </div>
            <div className="col">
              <img
                alt="City Support Services icon"
                className="publicIcons"
                src={require("../../../assets/support_budget101_icon.png")}
              />
              <p style={{ textAlign: "center" }}>
                City Support <br /> Services
              </p>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              margin: "auto"
            }}
          >
            <div className="col">
              <img
                alt="Transportation & Parking icon"
                size="25%"
                className="publicIcons"
                src={require("../../../assets/transportation_budget101_icon.png")}
              />
              <p>
                Transportation & <br /> Parking{" "}
              </p>
            </div>
            <div className="col">
              <img
                alt="Parks, Recreaction, & Culture icon"
                size="25%"
                className="publicIcons"
                src={require("../../../assets/parks_budget101_icon.png")}
              />
              <p>
                Parks, Recreaction, <br /> & Culture
              </p>
            </div>
            <div className="col">
              <img
                alt="Elected Officials icon"
                size="25%"
                className="publicIcons"
                src={require("../../../assets/officials_budget101_icon.png")}
              />
              <p>
                Elected <br /> Officials
              </p>
            </div>
          </div>
        </div>
        <div id="Breakdown">
          <h2>
            Each Service Area is broken down into <br />
            <span className="greenText"> one or more Bureaus</span>
          </h2>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <img
              alt="Bureau Breakdown"
              className="breakdown"
              src={require("../../../assets/bureau_breakdown_budget101.png")}
            />
          </div>
        </div>
        <div id="GetInvolved">
          <div style={{ display: "flex", justifyContent: "center" }}>
            <img
              alt="Bureau Breakdown"
              className="arrows"
              src={require("../../../assets/arrow_budget101.png")}
            />
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <h2>Get Involved!</h2>
          </div>
          <div>
            <p>
              The Portland City Budget is not just a number. A Proposed Budget
              is developed over six months, and a final Adopted Budget is
              approved in June. At every stage, Portland’s citizens play an
              active role in shaping the budget. Learn how you can get involved
              by visiting the City of Portland’s website.
            </p>
          </div>
        </div>
      </div>
    </CivicStoryCard>
  );
}

export default Budget101;
