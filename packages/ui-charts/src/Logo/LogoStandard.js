import React from "react";
import isClient from "../utils/isClient";
import logoStackStandard from "../../assets/civic-logo-stack_standard.svg";

const styles = {
  height: "60px",
  width: "auto"
};

const LogoStandard = () => (
  <img
    alt="Hack Oregon footer logo"
    src={isClient ? logoStackStandard : ""}
    style={styles}
  />
);

export default LogoStandard;
