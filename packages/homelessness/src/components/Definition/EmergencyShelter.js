/* eslint-disable max-len */

import React from 'react';
import PropTypes from 'prop-types';
import shared from '../shared.styles';

const EmergencyShelter = (props) => {
  const { year } = props;
  const { rawCount, rawTotal } = props.data;

  return (
    <div style={shared.textContainer}>
      <h2 style={shared.header}>Emergency Shelter</h2>
      <p style={shared.text}>
        {year === 2015 &&
        `This category refers to facilities with temporary, overnight sleeping accommodations. Some operate year-round as dedicated homeless shelters, others offer shelter temporarily in churches, schools, and community centers during winter months or on nights when there is severe weather. Some serve any person in need while others offer beds to specific groups, such as women with children, or veterans. On the night of January 28, ${year}, ${rawCount.toLocaleString()} of the ${rawTotal.toLocaleString()} who met the HUD definition of homelessness slept in emergency shelters.`
        }

        {year === 2013 &&
        `This category refers to facilities with temporary, overnight sleeping accommodations. Some operate year-round as dedicated homeless shelters, others offer shelter temporarily in churches, schools, and community centers during winter months or on nights when there is severe weather. Some serve any person in need while others offer beds to specific groups, such as women with children, or veterans. On the night of January 30, ${year}, ${rawCount.toLocaleString()} of the ${rawTotal.toLocaleString()} who met the HUD definition of homelessness sought refuge in emergency shelters.`
        }

        {year === 2011 &&
        `This category refers to facilities with temporary, overnight sleeping accommodations. Some operate year-round as dedicated homeless shelters, others offer shelter temporarily in churches, schools, and community centers during winter months or on nights when there is severe weather. Some serve any person in need while others offer beds to specific groups, such as women with children, or veterans. On the night of January 26, ${year}, ${rawCount.toLocaleString()} of the ${rawTotal.toLocaleString()} who met the HUD definition of homelessness sought refuge in emergency shelters.`
        }

        {year === 2009 &&
        'In 2009, Emergency Housing and Transitional Housing were included in one term, “Sheltered” All adults, children, and unaccompanied youth residing in emergency shelters and transitional housing, including domestic violence shelters, residential programs for runaway/homeless youth, and any hotel/motel/apartment voucher arrangements paid by a public/private agency because the person is homeless.'
        }
      </p>
    </div>
  );
};

EmergencyShelter.propTypes = {
  data: PropTypes.object.isRequired,
  year: PropTypes.number.isRequired,
};

export default EmergencyShelter;
