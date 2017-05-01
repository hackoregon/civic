import React, { PropTypes } from 'react';
import RechartsPie from '@hackoregon/component-library/lib/RechartsPie/RechartsPie';

const colors = ['#3e75ac', '#4c8ccd', '#68a3df', '#87baed', '#abd1f7', '#d3e8fd'];

const contentBlockStyle = {
  display: 'inline-block',
  verticalAlign: 'top',
  width: '33.333%',
  minWidth: '340px',
};

const numberColumnStyle = {
  display: 'inline-block',
  width: '30%',
  textAlign: 'right',
};

const labelColumnStyle = {
  boxSizing: 'border-box',
  display: 'inline-block',
  width: '70%',
  textAlign: 'left',
  paddingLeft: '1em',
};

const numberStyle = {
  color: colors[0],
  fontWeight: 'bold',
};

// THIS IS A HACK!!!
// The RechartsPie component centers the pie chart but then the legend runs off the edge.
const chartStyle = {
  marginLeft: '-50%',
};

const chartProportions = {
  chartWidth: 480,
  chartHeight: 160,
  iconSize: 15,
  pieInnerRadius: 40,
  pieOuterRadius: 80,
};

const RechartsPieStyles = {
  fontSize: '.8em',
};

const textAlignCenter = {
  textAlign: 'center',
};

/* eslint-disable dot-notation */
const DemographicDetailView = ({ demographics }) => {
  if (!demographics) return <div />;
  return (
    <div>
      {demographics &&
        <div style={textAlignCenter}>
          <h2>{demographics.name}</h2>
          <div style={contentBlockStyle}>
            <h3 style={textAlignCenter}>Race/Ethnicity</h3>
            <div style={chartStyle}>
              <RechartsPie
                data={demographics.populations}
                chartProportions={chartProportions}
                colors={colors}
                styles={RechartsPieStyles}
              />
            </div>
          </div>
          <div style={contentBlockStyle}>
            <h3 style={textAlignCenter}>Household Totals</h3>
            <div style={numberColumnStyle}>
              <p style={numberStyle}>{demographics.households['Households']}</p>
              <p style={numberStyle}>{demographics.households['Single-Person']}</p>
              <p style={numberStyle}>{demographics.households['Households with Children']}</p>
            </div>
            <div style={labelColumnStyle}>
              <p>Total Households</p>
              <p>Single Person Households</p>
              <p>Households With Children</p>
            </div>
          </div>
          <div style={contentBlockStyle}>
            <h3 style={textAlignCenter}>Vulnerable Populations</h3>
            <div style={numberColumnStyle}>
              <p style={numberStyle}>{demographics.households['Foreign-Born Individuals']}</p>
              <p style={numberStyle}>{demographics.households['Persons Exp-Disabilities']}</p>
              <p style={numberStyle}>{demographics.households['Persons 65 and Older']}</p>
            </div>
            <div style={labelColumnStyle}>
              <p>Foreign Born</p>
              <p>Persons With Disabilities</p>
              <p>65 &amp; Older</p>
            </div>
          </div>
        </div>
      }
    </div>
  );
};
/* eslint-enable dot-notation */

DemographicDetailView.propTypes = {
  demographics: PropTypes.object,
};

DemographicDetailView.defaultProps = {
  demographics: null,
};

export default DemographicDetailView;
