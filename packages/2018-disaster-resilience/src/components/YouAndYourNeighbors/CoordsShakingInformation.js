import React from 'react';
import { css } from 'emotion';

import { shakingScale, landslidesScale, liquefactionScale } from './shakingScales';
import { GradientScale } from '@hackoregon/component-library';

const emphasis = css`
  color: #000;
`;

const gradientLabel = css`
  ${emphasis};
  position: relative;
  bottom: -10px;
`;

const CoordsShakingInformation = (props) => (
  <div>
    <h3>
      <strong>Shaking Intensity: </strong>
      {shakingScale[props.coordsProperties.pgv_site_mean_mmi].shaking}
    </h3>
    <strong className={gradientLabel}>Less shaking</strong>
    <GradientScale
      domain={[1, 10]}
      primary={props.coordsProperties.pgv_site_mean_mmi}
      secondary={[
        props.coordsProperties.pgv_site_min_mmi,
        props.coordsProperties.pgv_site_max_mmi,
      ]}
      height={50}
    />
    <p>
      <strong>Best case:</strong>{' '}
      {shakingScale[props.coordsProperties.pgv_site_min_mmi].description}
    </p>
    <p className={emphasis}>
      <strong>Most likely case:</strong>{' '}
      {shakingScale[props.coordsProperties.pgv_site_mean_mmi].description}
    </p>
    <p>
      <strong>Worst case:</strong>{' '}
      {shakingScale[props.coordsProperties.pgv_site_max_mmi].description}
    </p>

    <h3>
      <strong>Landslide Potential:</strong>{' '}
      {props.coordsProperties.pgd_landslide_wet_mean_di}
    </h3>
    <strong className={gradientLabel}>Less landslide potential</strong>
    <GradientScale
      domain={[0, 4]}
      primary={landslidesScale[props.coordsProperties.pgd_landslide_wet_mean_di].scale}
      secondary={[
        landslidesScale[props.coordsProperties.pgd_landslide_wet_min_di].scale,
        landslidesScale[props.coordsProperties.pgd_landslide_wet_max_di].scale,
      ]}
      height={50}
    />
    <p>
      <strong>Best case:</strong>{' '}
      {landslidesScale[props.coordsProperties.pgd_landslide_wet_min_di].description}
    </p>
    <p className={emphasis}>
      <strong>Most likely case:</strong>{' '}
      {landslidesScale[props.coordsProperties.pgd_landslide_wet_mean_di].description}
    </p>
    <p>
      <strong>Worst case:</strong>{' '}
      {landslidesScale[props.coordsProperties.pgd_landslide_wet_max_di].description}
    </p>
    <h3>
      <strong>Liquefaction Potential:</strong>{' '}
      {props.coordsProperties.pgd_liquefaction_wet_mean_di}
    </h3>
    <strong className={gradientLabel}>Less liquefaction potential</strong>
    <GradientScale
      domain={[0, 4]}
      primary={
        liquefactionScale[props.coordsProperties.pgd_liquefaction_wet_mean_di].scale
      }
      secondary={[
        liquefactionScale[props.coordsProperties.pgd_liquefaction_wet_min_di].scale,
        liquefactionScale[props.coordsProperties.pgd_liquefaction_wet_max_di].scale,
      ]}
      height={50}
    />
    <p>
      <strong>Best case:</strong>{' '}
      {
        liquefactionScale[props.coordsProperties.pgd_liquefaction_wet_min_di]
          .description
      }
    </p>
    <p className={emphasis}>
      <strong>Most likely case:</strong>{' '}
      {
        liquefactionScale[props.coordsProperties.pgd_liquefaction_wet_mean_di]
          .description
      }
    </p>
    <p>
      <strong>Worst case:</strong>{' '}
      {
        liquefactionScale[props.coordsProperties.pgd_liquefaction_wet_max_di]
          .description
      }
    </p>
  </div>
);

export default CoordsShakingInformation;

