/* eslint-disable max-len */

import React from 'react';
import PropTypes from 'prop-types';
import shared from '../shared.styles';

const TransitionalHousing = (props) => {
  const { year } = props;
  const { rawCount, rawTotal } = props.data;

  return (
    <div style={shared.textContainer}>
      <h2 style={shared.header}>Transitional Housing</h2>
      <p style={shared.text}>
        {year === 2015 &&
        `Transitional housing is temporary housing coupled with services to help people secure permanent housing, typically within two years.  It can include hotels, motels, apartments or facilities designed to support housing-insecure people or families. Participants choose whether to accept services offered.  On the night of January 28, ${year}, ${rawCount.toLocaleString()} of the ${rawTotal.toLocaleString()} who met the HUD definition of homelessness planned to sleep in transitional housing.`
        }

        {year === 2013 &&
        ` Transitional housing is temporary housing coupled with services to help people secure permanent housing, typically within two years.  It can include hotels, motels, apartments or facilities designed to support housing-insecure people or families. Participants choose whether to accept services offered.On the night of January 30, ${year}, ${rawCount.toLocaleString()} of the ${rawTotal.toLocaleString()} who met the HUD definition of homelessness planned to sleep in transitional housing.`
        }

        {year === 2011 &&
        ` Transitional housing is temporary housing coupled with services to help people secure permanent housing, typically within two years.  It can include hotels, motels, apartments or facilities designed to support housing-insecure people or families. Participants choose whether to accept services offered.  On the night of January 26, ${year}, ${rawCount.toLocaleString()} of the ${rawTotal.toLocaleString()} who met the HUD definition of homelessness planned to sleep in transitional housing.`
        }

        {year === 2009 &&
          'In 2009, Emergency Housing and Transitional Housing were included in one term, “Sheltered” All adults, children, and unaccompanied youth residing in emergency shelters and transitional housing, including domestic violence shelters, residential programs for runaway/homeless youth, and any hotel/motel/apartment voucher arrangements paid by a public/private agency because the person is homeless.'
        }

      </p>
    </div>
  );
};

TransitionalHousing.propTypes = {
  data: PropTypes.object.isRequired,
  year: PropTypes.number.isRequired,
};

export default TransitionalHousing;
