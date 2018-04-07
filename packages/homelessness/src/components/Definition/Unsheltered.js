/* eslint-disable max-len */

import React from 'react';
import PropTypes from 'prop-types';
import shared from '../shared.styles';

const Unsheltered = (props) => {
  const { year } = props;
  const { rawCount, rawTotal } = props.data;

  return (
    <div>
      <h3 style={shared.header}>Unsheltered</h3>
      <p style={shared.text}>
        {year === 2015 &&
          `People are unsheltered when their primary nighttime residence is a public or private space not designed for sleeping—such as a parked car, an abandoned building, or the doorway of a commercial storefront. On the night of January 28, ${year}, ${rawCount.toLocaleString()} of the ${rawTotal.toLocaleString()} who met the HUD definition of homelessness were unsheltered.`
        }

        {year === 2013 &&
          `People are unsheltered when their primary nighttime residence is a public or private space not designed for sleeping—such as a parked car, an abandoned building, or the doorway of a commercial storefront. On the night of January 30, ${year}, ${rawCount.toLocaleString()} of the ${rawTotal.toLocaleString()} who met the HUD definition of homelessness were unsheltered.`
        }

        {year === 2011 &&
          `People are unsheltered when their primary nighttime residence is a public or private space not designed for sleeping—such as a parked car, an abandoned building, or the doorway of a commercial storefront. On the night of January 26, ${year}, ${rawCount.toLocaleString()} of the ${rawTotal.toLocaleString()} who met the HUD definition of homelessness were unsheltered.`
        }

        {year === 2009 &&
          'Individuals and families who are homeless and sleeping outside, in vehicles, in abandoned buildings, or other places not intended for human habitation. This includes streets, sidewalks, parks, alleys, transportation depots or other parts of transportation systems, all-night commercial establishments (e.g. movie theaters, laundromats, restaurants), abandoned buildings, farm outbuildings, caves, campgrounds, vehicles, and similar places.'
        }
      </p>
    </div>
  );
};

Unsheltered.propTypes = {
  data: PropTypes.object.isRequired,
  year: PropTypes.number.isRequired,
};

export default Unsheltered;
