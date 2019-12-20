/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { Fragment } from "react";
import ProactivePlanningVisualization from "./ProactivePlanningVisualization";

const socialCapitalIdeas = css`
  > li {
    margin-bottom: 10px;

    > span {
      font-weight: bold;
    }
  }
`;

const ProactivePlanningMeta = (/* data */) => ({
  title: "Planning for Citywide Resilience",
  slug: "proactive-planning-for-city-wide-resilience",
  introText: (
    <Fragment>
      <p>
        <a href="https://www.portlandoregon.gov/pbem/31667">
          Become a Portland NET
        </a>
        <br />
        <a href="https://www.portlandoregon.gov/pbem/59630">
          Become a BEECN volunteer
        </a>
        <br />
        <a href="https://portlandprepares.org/">Visit Portland Prepares</a>
        <br />
        <br />
      </p>
      <p>
        Another important part of preparation is getting to know your neighbors
        and contributing to a culture in which people will help each other in an
        emergency.
      </p>
      <p>
        The term “social capital” refers to the attributes of functional social
        groups, such as interconnected social networks, reciprocity and trust.
        When a community’s social capital is strong, its citizens are better
        able to face problems and overcome disasters.
      </p>
      <p>
        Although it’s difficult to find objective measures of social capital, a
        study from 2014 showed that census response rates strongly predict a
        community’s level of social capital: the higher an area’s response rate
        to the census, the greater its social capital. In this chart, you can
        see Portland’s per capita displacement mapped against its census
        non-response rate:
      </p>
    </Fragment>
  ),
  visualization: ProactivePlanningVisualization, // data is passed to this as props
  additionalText: (
    <Fragment>
      <p>
        A Social Capital Building Toolkit, published by Thomas Sander and
        Kathleen Lowney in 2006, offers five approaches to building social
        capital, with one-on-one, small group, and large group options for each:
      </p>
      <ol css={socialCapitalIdeas}>
        <li>
          <span>Celebration/Food</span>
          <br />
          One-on-one example: inviting someone to join you at a restaurant.
          <br />
          Small group example: a dinner party, or supper clubs.
          <br />
          Large group example: a block party, or a neighborhood picnic.
        </li>
        <li>
          <span>Joint activity around common interest or hobby</span>
          <br />
          One-on-one example: walking with a friend.
          <br />
          Small group examples: book club, or a bowling league.
          <br />
          Large group examples: professional or civic association meetings, a
          garden show, a fundraising sports event like a bike-a-thon, or a
          pulpit or chorus swap.
        </li>
        <li>
          <span>Doing a favor for another</span>
          <br />
          One-on-one example: borrowing a tool from a neighbor or carpooling.
          <br />
          Small group example: revolving credit association or a babysitting
          cooperative.
          <br />
          Large group example: grocery cooperatives.
        </li>
        <li>
          <span>Discussion of community issues</span>
          <br />
          One-on-one example: street conversation.
          <br />
          Small group example: neighborhood association.
          <br />
          Large group example: town forum.
        </li>
        <li>
          <span>Undertaking joint goal</span>
          <br />
          One-on-one example: mentoring or tutoring.
          <br />
          Small group example: cleaning up an abandoned lot.
          <br />
          Large group examples: a political rally.
        </li>
      </ol>
    </Fragment>
  ),
  shareText: null, // TODO
  tags: [
    /* "Disaster Resilience", "Portland", "Oregon", "Chart" */
  ],
  selector: null,
  analysis: null, // TODO
  metadata: null,
  metadataQA:
    "earthquake_regional_impact_analysis_for_clackamas_multnomah_and_washington_counties_oregon",
  resources: [
    {
      heading: "Organizations",
      items: [
        { link: "http://www.hackoregon.org", description: "Hack Oregon" },
        {
          link: "https://www.civicsoftwarefoundation.org",
          description: "Civic Software Foundation"
        },
        { link: "https://www.civicplatform.org", description: "Civic Platform" }
      ]
    }
  ],
  // authors likely an array of keys in the future
  authors: "demo"
});

export default ProactivePlanningMeta;
