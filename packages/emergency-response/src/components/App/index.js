/* eslint-disable import/no-extraneous-dependencies */
// This should probably be the core component, containing, nav etc
import PropTypes from "prop-types";

import React from "react";

import "@hackoregon/component-library/assets/global.styles.css";

import { PageLayout, CivicStoryCard } from "@hackoregon/component-library";

import BagelShop from "../BagelShop/index";
import FmaMap from "../FmaMap/index";
import PieWhatTheyDo from "../PieWhatTheyDo/index";
import HowWhenBusy from "../HowWhenBusy/index";
import ResponseTimeVaries from "../ResponseTimeVaries/index";

import firstFiveMinutesTimeline from "../../../assets/emergency-response-5min.svg";

function App(props) {
  return (
    <PageLayout header={false}>
      <CivicStoryCard
        watermark={<div />}
        footer={false}
        title="What Does Portland Fire &amp; Rescue Do?"
        slug="what-they-do"
      >
        <p className="Description">
          Surprisingly, the vast majority (71.9%) of calls Portland Fire &
          Rescue responds to are medical, while only 3.2% of calls turn out to
          be actual fires. The remaining incidents are service calls, “good
          intent” calls, and false alarms.
        </p>
        <div style={{ display: "flex", flexFlow: "row wrap" }}>
          <PieWhatTheyDo style={{ width: "50%" }} />
          <div style={{ width: "50%" }}>
            <p style={{ textAlign: "left" }}>
              <strong style={{ color: "#EE495C" }}>Medical incidents</strong>{" "}
              include an even wider range of categories, as you might expect.
              The Bureau of Emergency Communications (911) routes all calls to
              either PF&R, the Police Bureau, or ambulance services (and often a
              combination). PF&R personnel include trained paramedics who can
              respond to calls for any kind of medical emergency.
            </p>
            <p style={{ textAlign: "left" }}>
              <strong style={{ color: "#EE495C" }}>Fire incidents</strong> cover
              a range of categories including explosions, vehicle fires, and
              dumpster and trash fires.
            </p>
            <p style={{ textAlign: "left" }}>
              <strong style={{ color: "#EE495C" }}>Service calls</strong> are
              calls not related to fire, medical, rescue, or hazmat. Think cats
              in trees, street flooding, and even stubborn rings that you can’t
              get off that second knuckle!
            </p>
            <p style={{ textAlign: "left" }}>
              <strong style={{ color: "#EE495C" }}>Good intent</strong> calls
              occur when there’s not actually an emergency. For example, steam
              or gas mistaken for smoke.
            </p>
          </div>
        </div>
      </CivicStoryCard>
      <CivicStoryCard
        watermark={<div />}
        footer={false}
        title="Who Does Portland Fire &amp; Rescue Serve?"
        slug="er-map"
      >
        <p className="Description">
          Portland Fire & Rescue divides the city into 31 Fire Management Areas
          (FMAs). We’ve mapped them against their specific demographic data from
          the 2010-2015 five-year average census to help PF&R better understand
          the neighborhoods they serve, and the dynamics that might impact
          emergency response times. Click on individual FMAs in the map below to
          see the demographics that PF&R was interested in, as well as average
          emergency response times.
        </p>
        <FmaMap />
      </CivicStoryCard>
      <CivicStoryCard
        watermark={<div />}
        footer={false}
        title="How Busy Is Portland Fire &amp; Rescue? When Are They Most Busy?"
        slug="when-theyre-busy"
      >
        <p className="Description">
          Over the past 7 years, on an average day, each FMA has fielded
          approximately 6-8 calls. Below is a breakdown of how the frequency of
          these calls change over the course of a day, and throughout the
          calendar year.
        </p>
        <p className="Description">
          The number of calls is fairly consistent across a calendar year, with
          some notable distinctions. There are more fire calls each summer, and
          as you might expect, July 4th typically has the highest number of
          incidents of any given year.
        </p>
        <HowWhenBusy />
        <p className="Description">
          Call frequency ebbs and flows throughout the day, peaking during rush
          hour.
        </p>
      </CivicStoryCard>
      <CivicStoryCard
        watermark={<div />}
        footer={false}
        title="The First Five Minutes"
        slug="first-five-minutes"
      >
        <img
          style={{ maxWidth: "100%" }}
          src={firstFiveMinutesTimeline}
          alt="Timeline of a fire response"
        />
        <p className="Description">
          The median response time for the City of Portland is about 4 minutes
          and 35 seconds, slightly lower for medical calls.
        </p>
      </CivicStoryCard>
      <CivicStoryCard
        watermark={<div />}
        footer={false}
        title="The Anatomy Of A Four-Alarm Fire"
        slug="anatomy-of-a-four-alarm-fire"
      >
        <p className="Description">
          We looked at a specific event to better understand the comings and
          goings of various responders during a four-alarm incident.
        </p>
        <p className="Description">
          In this video, you’ll see the wide range of personnel who showed up
          over the three day period during which the immediate emergency was
          resolved and the incident was investigated.
        </p>
        <BagelShop />
      </CivicStoryCard>
      <CivicStoryCard
        watermark={<div />}
        footer={false}
        title="How Response Time Varies Across The City"
        slug="response-time-varies"
      >
        <p className="Description">
          Portland Fire and Rescue shows remarkably consistent response times
          across all FMAs. Below, we’ve charted response times vs. various
          demographic trends within each Fire Management Area. You’ll notice
          there’s no meaningful trendline, which is good: it indicates equitable
          response times across the city. We found no apparent bias with regard
          to population density, average income, or racial makeup of
          neighborhoods.
        </p>
        <p className="Description">
          There is one notable outlier to the above. FMA 27, a long, narrow
          region which includes the West Hills, has a significantly higher
          response time. One possible reason for this exception to the rule
          could be the particular terrain of the neighborhoods—the roads are
          narrow and winding. Perhaps they make it more difficult for large
          emergency response vehicles to navigate.
        </p>
        <ResponseTimeVaries />
        <p className="Description">
          Please see our Github repo for detailed methodology and documentation.
        </p>
      </CivicStoryCard>

      {React.Children.toArray(props.children)}
    </PageLayout>
  );
}

App.displayName = "App";
App.defaultProps = {
  children: <div />
};

App.propTypes = {
  children: PropTypes.node
};

export default App;
