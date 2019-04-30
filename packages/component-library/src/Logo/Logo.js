import React from "react";
import PropTypes from "prop-types";
import CivicLogo from "./CivicLogo";
import CivicLogoInverted from "./CivicLogoInverted";
import CivicLogoAnimated from "./CivicLogoAnimated";
import CivicLogoAnimatedInverted from "./CivicLogoAnimatedInverted";
import CivicLogoC from "./CivicLogoC";
import CivicLogoCAnimated from "./CivicLogoCAnimated";
import CivicLogoCInverted from "./CivicLogoCInverted";

function Logo({ type, alt }) {
  switch (type) {
    case "standardLogo":
      return <CivicLogo alt={alt} />;
    case "standardLogoInverted":
      return <CivicLogoInverted alt={alt} />;
    case "standardLogoAnimated":
      return <CivicLogoAnimated alt={alt} />;
    case "standardLogoAnimatedInverted":
      return <CivicLogoAnimatedInverted alt={alt} />;
    case "squareLogo":
      return <CivicLogoC alt={alt} />;
    case "squareLogoAnimated":
      return <CivicLogoCAnimated alt={alt} />;
    case "squareLogoInverted":
      return <CivicLogoCInverted alt={alt} />;
    default:
      return <CivicLogoAnimated alt={alt} />;
  }
}

Logo.displayName = "Logo";
Logo.propTypes = {
  type: PropTypes.string,
  alt: PropTypes.string
};
Logo.defaultProps = {
  type: "standardLogoAnimated",
  alt: "CIVIC Logo"
};

export default Logo;
