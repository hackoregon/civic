import React from 'react';

import { CivicStoryCard, Placeholder } from '@hackoregon/component-library';

export class VulnerableStudentPopulations extends React.Component {
  componentDidMount() {
    // initialize data here
  }

  render() {
    return (
      <CivicStoryCard
        title="Vulnerable Student Populations"
        slug="vulnerable-student-populations"
      >
        <p>Students eligible for or receiving Free and Reduced meals at a school are an indicator
           of economic hardship of their families. This map displays both the proportion and number 
           of students who are eligible or receive Free and Reduced meals at Portland Public Schools.
        </p>
        <Placeholder issue="228"/>
        <p>School breakfasts and lunches are available to all students at most PPS schools,
           these meals are given to students for free or at a reduced cost if they or their school
            qualify. PPS changed the data used as a measure of these students in 2014. 
        </p>
        <p>Prior to 2014, Free and Reduced Meal (FRM) % values were reported and from 2014 onwards 
          Free Meal by Direct Certification has been used. FRM % measures students eligible for free
           or reduced-price meals and is based on family size and income information. Free Meal by
            Direct Certification measures students who receive free meals through data shared by the 
            state with the school district.  FRM % is not comparable across schools and not comparable
             for a Community Eligibility Provision (CEP) school. CEP is a non-pricing meal service option 
             for schools in low-income areas. CEP allows high poverty schools to serve free meals to all 
             enrolled students without collecting household applications. Free Meal by Direct Certification 
             % is comparable across all schools.
        </p>
      </CivicStoryCard>
    );
  }
}

VulnerableStudentPopulations.displayName = 'VulnerableStudentPopulations';

// Connect this to the redux store when necessary
export default VulnerableStudentPopulations;
