import React from 'react';

import { CivicStoryCard, Placeholder } from '@hackoregon/component-library';

export class UnderstandingStaffCuts extends React.Component {
  componentDidMount() {
    // initialize data here
  }

  render() {
    return (
      <CivicStoryCard
        title="Understanding Staff Cuts in Portland Public Schools"
        slug="understanding-staff-cuts"
      >
        <p>PPS Parents received an email explaining proposed staffing changes in Mid-April. Hack Oregon conducted an analysis of these changes with the assumption of PPS’s goals as
          <ol>
            <li>Ensure schools have adequate staffing to maintain reasonable class sizes.
            </li>
            <li>Support the district’s equity goals.
            </li>
            <li>Provide baseline academic program offerings at every school.
            </li>
            <li>Provide greater stability over time.
            </li>
          </ol>
          are supported by other PPS data.  
        </p>
        <Placeholder issue="201" />
        <p> Due to the quality of data and complexity of school populations, Hack Oregon elected to 
          conduct a simple linear regression analysis. Using data from the original PDF and PPS data on 
          underserved populations our analysis concluded on the following model: 
        </p>
        <p>Students per FTE 2018 - 19 = 18.82 - 2.69*(Historically Underserved %) + 1.58*(% Changes in Enrollment)  
          - 10.91*(2018-19 % Free Meals by Direct Cert)
        </p>
        <p>A high level interpretation of this model is that Historically Underserved % and 2018 -19 
          Free Meals by Direct Cert are negatively correlated with Class Room Size and Change in Enrollment 
          is positively correlated with Class Room Size. That is to say that of the goals stated by PPS are 
          consistent with our preliminary findings. The average ratio of Students to FTE across schools is 
          about 19, an increase in Historically Underserved % or 2018-19 % Free Meals by Direct Cert is
           correlated with a decrease in the ratio of Students to FTE. (TLDW; more staff in schools with 
           higher % of Direct Cert or Historically underserved populations). In the table, you can explore 
           which schools are outliers in our model. 
        </p>
        <p>This is not to say that this was the model that PPS ultimately made their decision on. Our model
           accounts for about 80% of the variation in the data. Our goal here is to use an outside methodology 
           to assess PPS changes against their stated goals. This is a first step in understanding these changes.
            We encourage you to explore the rest of the cards in the education model to further inform your 
            understanding of PPS data. 
        </p>
        <p>DEFF: 
        </p>
        <p>FTE (Full Time Employment): This includes full time teachers, classroom assistants, secretaries ect. 
        </p>
        <p>Direct Certification: Direct certification requires states and local educational agencies to 
          automatically enroll students from households already participating in the Supplemental Nutrition
           Assistance Program (SNAP) or the Food Distribution Program on Indian Reservations, without an 
           additional application from the child’s family to assist low-income households with children
            eligible for free meals at school <a href="https://www.fns.usda.gov/tags/direct-certification"> (from this website)</a>
        </p>
        <p>Historically Underserved: This is a combination of Special Education, English Language Learner, 
          and Racial Minority Students 
        </p>

      </CivicStoryCard>
    );
  }
}

UnderstandingStaffCuts.displayName = 'UnderstandingStaffCuts';

// Connect this to the redux store when necessary
export default UnderstandingStaffCuts;
