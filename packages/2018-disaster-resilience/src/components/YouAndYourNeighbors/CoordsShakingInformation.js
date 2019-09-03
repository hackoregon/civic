import React from "react";
import PropTypes from "prop-types";

import { ChartTitle } from "@hackoregon/component-library";

import {
  shakingScale,
  landslidesScale,
  liquefactionScale,
  transformForLandslidesAndLiquefaction
} from "./shakingScales";
import IntensityDisplay from "./IntensityDisplay";

const CoordsShakingInformation = ({ coordsProperties }) => (
  <div>
    <ChartTitle
      title="Earthquake Impacts For Your Location"
      subtitle="Expected outcomes in a wet season magnitude 9.0 Cascadia Subduction Zone earthquake"
    />
    <IntensityDisplay
      mean={coordsProperties.pgv_site_mean_mmi}
      min={coordsProperties.pgv_site_min_mmi}
      max={coordsProperties.pgv_site_max_mmi}
      metric="Shaking Intensity"
      label="More shaking"
      scale={shakingScale}
      domain={[1, 10]}
    />
    <IntensityDisplay
      mean={parseFloat(coordsProperties.pgd_landslide_wet_mean)}
      min={parseFloat(coordsProperties.pgd_landslide_wet_min)}
      max={parseFloat(coordsProperties.pgd_landslide_wet_max)}
      metric="Landslide Potential"
      label="More landslides"
      scale={landslidesScale}
      transform={transformForLandslidesAndLiquefaction}
      domain={[0, 1180]}
    />
    <IntensityDisplay
      mean={parseFloat(coordsProperties.pgd_liquefaction_wet_mean)}
      min={parseFloat(coordsProperties.pgd_liquefaction_wet_min)}
      max={parseFloat(coordsProperties.pgd_liquefaction_wet_max)}
      metric="Liquefaction Potential"
      label="More liquefaction"
      scale={liquefactionScale}
      transform={transformForLandslidesAndLiquefaction}
      domain={[0, 1180]}
    />
  </div>
);

CoordsShakingInformation.propTypes = {
  coordsProperties: PropTypes.shape({
    pgv_site_mean_mmi: PropTypes.number,
    pgv_site_min_mmi: PropTypes.number,
    pgv_site_max_mmi: PropTypes.number,
    pgd_landslide_wet_mean: PropTypes.number,
    pgd_landslide_wet_min: PropTypes.number,
    pgd_landslide_wet_max: PropTypes.number,
    pgd_liquefaction_wet_mean: PropTypes.number,
    pgd_liquefaction_wet_min: PropTypes.number,
    pgd_liquefaction_wet_max: PropTypes.number
  })
};

export default CoordsShakingInformation;
