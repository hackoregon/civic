import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { CivicStoryCard, DataTable, Collapsable } from '@hackoregon/component-library';

import { fetchUnderstandingStaffCuts } from '../../state/understanding-staff-cuts/actions';

import {
  isUnderstandingStaffCutsPending,
  catchUnderstandingStaffCutsErrors,
  getUnderstandingStaffCutsData,
} from '../../state/understanding-staff-cuts/selectors';

export class UnderstandingStaffCuts extends React.Component {
  componentDidMount() {
    this.props.init();
  }

  render() {
    const {
      isLoading,
      error,
      understandingStaffCuts,
    } = this.props;

    const tableCols = [
      {
        align: 'left',
        header: 'School',
        key: 'school',
      },
      {
        header: 'Students per FTE Staff',
        key: 'student-staff',
        columns:
        [
          {
            align: 'right',
            header: 'PPS Proposed 2018-2019 Staffing',
            key: 'students',
          },
          {
            align: 'right',
            header: 'Hack Oregon Predicted Staffing',
            key: 'predictions',
          },
          {
            align: 'right',
            header: 'Variation',
            key: 'variation',
          },
        ],
      },
      {
        align: 'right',
        header: '% Change Enrollment',
        key: 'changes_in_enrollment_pct',
      },
      {
        header: 'Student Demographics',
        key: 'students-demo',
        columns:
        [
          {
            align: 'right',
            header: '% From Historically Underserved Groups',
            key: 'historically_underserved_pct',
          },
          {
            align: 'right',
            header: '% Recieving Free Meals by Direct Certification',
            key: 'free_meals_direct_cert_pct',
          },
        ],
      },
    ];

    const tableData = {
      columns: tableCols,
      data: understandingStaffCuts,
    };

    return (
      <CivicStoryCard
        title="Understanding Staff Cuts in Portland Public Schools"
        slug="understanding-staff-cuts"
        loading={isLoading}
        error={error && 'Could not load sweeps data'}
      >
        <Collapsable>
          <Collapsable.Section>
            <div>
              <p>Portland Public Schools (PPS) parents received an email explaining proposed staffing changes in mid-April, 2018. Hack Oregon conducted an analysis of these changes using PPS’s stated goals listed below.</p>
              <ul>
                <li>Ensure schools have adequate staffing to maintain reasonable class sizes.</li>
                <li>Support the district’s equity goals.</li>
                <li>Provide baseline academic program offerings at every school.</li>
                <li>Provide greater stability over time.</li>
              </ul>
              <p>See the results of our analysis in the sortable table below.</p>
            </div>
          </Collapsable.Section>
          <Collapsable.Section hidden>
            <div>
              { understandingStaffCuts &&
                <DataTable
                  data={tableData}
                />
              }
            <p>Due to the quality of data and complexity of school populations, Hack Oregon elected to conduct a simple linear regression analysis. Using data from the original PDF and PPS data on underserved populations our analysis concluded on the following model:</p>
            <p>Students per FTE 2018 - 19 = 18.82 - 2.69*(Historically Underserved %) + 1.58*(% Changes in Enrollment)  - 10.91*(2018-19 % Free Meals by Direct Cert)</p>
            <p>This is not to say that this was the model that PPS ultimately made their decision on. Our model accounts for about 80% of the variation in the data. Our goal here is to use an outside methodology to assess PPS changes against their stated goals. This is a first step in understanding these changes. We encourage you to explore the rest of the cards in the education model to further inform your understanding of PPS data. </p>
            <p>A high level interpretation of this model is that Historically Underserved % and 2018 -19 Free Meals by Direct Cert are negatively correlated with Class Room Size and Change in Enrollment is positively correlated with Class Room Size. That is to say that of the goals stated by PPS are consistent with our preliminary findings. The average ratio of Students to FTE across schools is about 19, an increase in Historically Underserved % or 2018-19 % Free Meals by Direct Cert is correlated with a decrease in the ratio of Students to FTE. (TLDW; more staff in schools with higher % of Direct Cert or Historically underserved populations). In the table, you can explore which schools are outliers in our model. </p>
            <p><strong>Definitions</strong></p>
            <ul>
              <li>FTE (Full Time Employment): This includes full time teachers, classroom assistants, secretaries etc.</li>
              <li>Direct Certification: Direct certification requires states and local educational agencies to automatically enroll students from households already participating in the Supplemental Nutrition Assistance Program (SNAP) or the Food Distribution Program on Indian Reservations, without an additional application from the child’s family to assist low-income households with children eligible for free meals at school (<a href="https://www.fns.usda.gov/tags/direct-certification">source</a>)</li>
              <li>Historically Underserved: This is a combination of Special Education, English Language Learner, and Racial Minority Students</li>
            </ul>
            </div>
          </Collapsable.Section>
        </Collapsable>
      </CivicStoryCard>
    );
  }
}
UnderstandingStaffCuts.displayName = 'UnderstandingStaffCuts';
UnderstandingStaffCuts.propTypes = {
  init: PropTypes.func,
  isLoading: PropTypes.bool,
  error: PropTypes.string,
  understandingStaffCuts: PropTypes.object,
};

export default connect(
  state => ({
    isLoading: isUnderstandingStaffCutsPending(state),
    error: catchUnderstandingStaffCutsErrors(state),
    understandingStaffCuts: getUnderstandingStaffCutsData(state),
  }),
  dispatch => ({
    init() {
      dispatch(fetchUnderstandingStaffCuts());
    },
  }),
)(UnderstandingStaffCuts);
