/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import MuiExpansionPanel from "@material-ui/core/ExpansionPanel";
import MuiExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import MuiExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import { BrandColors } from "@hackoregon/component-library";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import sections from "./platformData";

const { action } = BrandColors;

const componentWrapper = css`
  margin-top: 36px;
  width: 100%;
`;

const panelsContainer = css`
  display: grid;
  grid-template-rows: repeat(3, 1fr);
  grid-row-gap: 20px;
`;

const panelStyle = css`
  display: grid;
  grid-template-columns: 1fr 100px;
`;

const imgStyle = css`
  width: 100px;
  justify-self: center;
`;

const textStyle = css`
  font-family: Rubik;
  font-style: normal;
  font-weight: normal;
  font-size: 24px;
  line-height: 28px;
  align-self: center;
`;

const ExpansionPanel = withStyles({
  root: {
    border: "1px solid rgba(0, 0, 0, .125)",
    boxShadow: "none",
    "&:not(:last-child)": {
      borderBottom: 0
    },
    "&:before": {
      display: "none"
    },
    "&$expanded": {
      margin: "auto"
    }
  },
  expanded: {}
})(MuiExpansionPanel);

const ExpansionPanelSummary = withStyles({
  root: {
    backgroundColor: "rgba(0, 0, 0, .03)",
    borderBottom: "1px solid rgba(0, 0, 0, .125)",
    marginBottom: -1,
    minHeight: 56,
    "&$expanded": {
      minHeight: 56
    },
    disableRipple: true
  },
  content: {
    "&$expanded": {
      margin: "12px 0"
    },
    fontFamily: "Rubik",
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: "24px",
    lineHeight: "28px",
    color: "inherit"
  },
  expanded: {},
  expandIcon: {
    color: action.hex
  }
})(MuiExpansionPanelSummary);

const ExpansionPanelDetails = withStyles({
  root: {
    padding: "24px"
  }
})(MuiExpansionPanelDetails);

export default function CustomizedExpansionPanels() {
  const [expanded, setExpanded] = useState("panel1");

  const handleChange = panel => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <div css={componentWrapper}>
      <ExpansionPanel
        square
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
      >
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1d-content"
          id="panel1d-header"
        >
          Design Systems
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <div css={panelsContainer}>
            {sections.section1.map(data => {
              return (
                <div css={panelStyle} key={data.id}>
                  <p css={textStyle}>{data.text}</p>
                  <img src={data.imgSrc} alt={data.imgAlt} css={imgStyle} />
                </div>
              );
            })}
          </div>
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <ExpansionPanel
        square
        expanded={expanded === "panel2"}
        onChange={handleChange("panel2")}
      >
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2d-content"
          id="panel2d-header"
        >
          Analytics
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <div css={panelsContainer}>
            {sections.section2.map(data => {
              return (
                <div css={panelStyle} key={data.id}>
                  <p css={textStyle}>{data.text}</p>
                  <img src={data.imgSrc} alt={data.imgAlt} css={imgStyle} />
                </div>
              );
            })}
          </div>
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <ExpansionPanel
        square
        expanded={expanded === "panel3"}
        onChange={handleChange("panel3")}
      >
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3d-content"
          id="panel3d-header"
        >
          Infrastructure
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <div css={panelsContainer}>
            {sections.section3.map(data => {
              return (
                <div css={panelStyle} key={data.id}>
                  <p css={textStyle}>{data.text}</p>
                  <img src={data.imgSrc} alt={data.imgAlt} css={imgStyle} />
                </div>
              );
            })}
          </div>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  );
}
