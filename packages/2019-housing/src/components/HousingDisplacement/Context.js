/* eslint-disable import/no-extraneous-dependencies */
/** @jsx jsx */
import { jsx } from "@emotion/core";
import { Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Access from "./Access";
import Attribution from "./Attribution";
import Lineage from "./Lineage";
import Methodology from "./Methodology";
import PrivacySecurity from "./PrivacySecurity";
import Governance from "./Governance";
import About from "./About";
import Constituents from "./Constituents";
import LinksResources from "./LinksResources";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%"
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular
  }
}));

function ContextAccordion() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <h2>About this data</h2>
        </AccordionSummary>
        <AccordionDetails>
          <About />
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <h2>Data Lineage</h2>
        </AccordionSummary>
        <AccordionDetails>
          <Lineage />
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3a-content"
          id="panel3a-header"
        >
          <h2>Methodology</h2>
        </AccordionSummary>
        <AccordionDetails>
          <Methodology />
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel4a-content"
          id="panel4a-header"
        >
          <h2>Governance</h2>
        </AccordionSummary>
        <AccordionDetails>
          <Governance />
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel5a-content"
          id="panel5a-header"
        >
          <h2>Data Access</h2>
        </AccordionSummary>
        <AccordionDetails>
          <Access />
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel6a-content"
          id="panel6a-header"
        >
          <h2>Privacy & Security</h2>
        </AccordionSummary>
        <AccordionDetails>
          <PrivacySecurity />
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel7a-content"
          id="panel7a-header"
        >
          <h2>Data Constituent Engagement</h2>
        </AccordionSummary>
        <AccordionDetails>
          <Constituents />
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel8a-content"
          id="panel8a-header"
        >
          <h2>Attribution</h2>
        </AccordionSummary>
        <AccordionDetails>
          <Attribution />
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel9a-content"
          id="panel9a-header"
        >
          <h2>Links & Resources</h2>
        </AccordionSummary>
        <AccordionDetails>
          <LinksResources />
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

const Context = () => (
  <Fragment>
    <ContextAccordion />
  </Fragment>
);

export default Context;
