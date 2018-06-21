import React from 'react';

import { CivicStoryCard, Placeholder } from '@hackoregon/component-library';

export class HumanImpactOfSweepingUrbanCampsites extends React.Component {
  componentDidMount() {
    // initialize data here
  }

  render() {
    return (
      <CivicStoryCard
        title="Are reported campsites and sweeps consistent over time?"
        slug="human-impact-of-sweeping-urban-campsites"
      >
        <p>The Homelessness/Urban Camping Impact Reduction Program (HUCIRP) operates a public reporting system for campsite locations. This card explores the total quantity of reports from the public compared to the amount of unique campsites that were reported, and then looks at HUCIRP's clean-up response to public reports.
        </p>
        <Placeholder issue="100"/>
        <Placeholder issue="102"/>

        <p>The Homelessness/Urban Camping Impact Reduction Program's (HUCIRP) weekly campsite clean-up
           reports provide an estimate of how many unique campsites were reported in a given week, in 
           addition to a total number of campsite reports (methodology is not given for how unique
            locations were estimated). 
        </p>
        <p>This visualization makes two comparisons. First, it compares the number of reports 
          submitted by the public to the reporting system in a given week that reported campsites 
          (excluding vehicles) and the number of unique campsites that were identified in those reports.
          Second, the reports and reported campsites are compared to the number of campsite sweeps. 
          Notice that the number of estimated campsites remains consistent over time, while the number 
          of responses/campsite sweeps has increased over time. The number of reported campsites per week
           has also increased over time.
        </p>
        <p>The One Point of Contact Campsite Reports is linked from this toolkit as a resource for the public.
           The information requested about the campsites includes qualitative information identifying the number 
           and type of people at the campsite (presence of children, dogs, etc.), how many people are present,
          whether the campsite is a vehicle or a tent, and a criteria for reporting a campsite, including: 
          "repeated instances of overly aggressive behavior from campers", "public intoxication and/or
          conspicuous drug use," "campsite obstructs public right-of-way", "misuse of public spaces", 
          "structures", "excessive trash and/or biohazards", or "damage to the environment." See the 
          Source link for more information about how many reports fit the various criteria and how the 
          public is responding to campsites within the reports.
        </p>

      </CivicStoryCard>
    );
  }
}

HumanImpactOfSweepingUrbanCampsites.displayName = 'HumanImpactOfSweepingUrbanCampsites';

// Connect this to the redux store when necessary
export default HumanImpactOfSweepingUrbanCampsites;
