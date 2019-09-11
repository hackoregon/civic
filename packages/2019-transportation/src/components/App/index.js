import { Fragment } from "react";

/** @jsx jsx */
import { jsx, css, Global } from "@emotion/core";
import {
  BrandTheme,
  PageLayout,
  CivicCardLayoutClassic
} from "@hackoregon/component-library";
import SystemWideSummary from "../SystemWideSummary";
import MorningRush from "../MorningRush";
import NorthwestEverett from "../NorthwestEverett";
import SouthwestMadison from "../SouthwestMadison";
import DisturbanceStops from "../DisturbanceStops";
import Hypnotoad from "../../assets/hypnotoad";

const sectionMarginMedium = css`
  display: block;
  margin: 64px auto;
`;

const App = () => (
  <Fragment>
    <Global styles={BrandTheme} />
    <PageLayout
      teamTitle="Transportation"
      heroTitle="Transit Operations Analytics Data (TOAD)"
      heroSubtitle="Visualizing transit operations data"
      overlay
    >
      <Hypnotoad />
      <section css={sectionMarginMedium}>
        <SystemWideSummary Layout={CivicCardLayoutClassic} />
      </section>

      <section css={sectionMarginMedium}>
        <MorningRush Layout={CivicCardLayoutClassic} />
      </section>

      <section css={sectionMarginMedium}>
        <DisturbanceStops Layout={CivicCardLayoutClassic} />
      </section>

      <section css={sectionMarginMedium}>
        <SouthwestMadison Layout={CivicCardLayoutClassic} />
      </section>

      <section css={sectionMarginMedium}>
        <NorthwestEverett Layout={CivicCardLayoutClassic} />
      </section>
    </PageLayout>
  </Fragment>
);

App.displayName = "App";

export default App;
