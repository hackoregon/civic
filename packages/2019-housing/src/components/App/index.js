import { Fragment } from "react";

/** @jsx jsx */
import { jsx, css, Global } from "@emotion/core";
import {
  BrandTheme,
  PageLayout,
  PullQuote,
  CivicCardLayoutClassic // eslint-disable-line
} from "@hackoregon/component-library";
import HouseholdIncomeByRace from "../HouseholdIncomeByRace";
import AduDistributions from "../AduDistributions";
import HomeOwnershipRates from "../HomeOwnershipRates";
import HomeLoanApprovals from "../HomeLoanApprovals";
import BlackPopulationChange from "../BlackPopulationChange";
import HousingDisplacement from "../HousingDisplacement";

const sectionMarginSmall = css`
  display: block;
  margin: 12px auto;
`;
const sectionMarginMedium = css`
  display: block;
  margin: 64px auto;
`;
const sectionMaxWidthSmall = css`
  max-width: 700px;
`;
const sectionMaxWidthMedium = css`
  max-width: 900px;
`;
const sectionBodyHeading = css`
  margin: 80px auto 24px;
`;
const paragraphStyle = css`
  line-height: 2;
  font-size: 18px;
`;

const App = () => (
  <Fragment>
    <Global styles={BrandTheme} />
    <PageLayout
      teamTitle="Housing"
      heroTitle="🚧 Site Under Construction 🚜"
      heroSubtitle="Playground for building out the 2019 Housing team frontend"
      overlay
    >
      <section css={[sectionBodyHeading, sectionMaxWidthSmall]}>
        <h2>Ullamcorper dignissim cras tincidunt?</h2>
      </section>
      <section css={[sectionMarginSmall, sectionMaxWidthSmall]}>
        <p css={paragraphStyle}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Elementum
          curabitur vitae nunc sed. Nisl condimentum id venenatis a condimentum
          vitae sapien pellentesque. Sapien eget mi proin sed libero enim sed
          faucibus turpis. Fermentum leo vel orci porta.
        </p>
      </section>
      <section css={[sectionMarginSmall, sectionMaxWidthSmall]}>
        <p css={paragraphStyle}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Elementum
          curabitur vitae nunc sed. Nisl condimentum id venenatis a condimentum
          vitae sapien pellentesque. Sapien eget mi proin sed libero enim sed
          faucibus turpis. Fermentum leo vel orci porta.
        </p>
      </section>
      <section css={[sectionMarginMedium, sectionMaxWidthMedium]}>
        <PullQuote
          quoteText="The lorem ipsum text is typically a scrambled section of De
        finibus bonorum et malorum, with words altered, added, and removed to make
        it nonsensical, improper Latin."
        />
      </section>
      <section css={[sectionMarginSmall, sectionMaxWidthSmall]}>
        <p css={paragraphStyle}>
          Dui accumsan sit amet nulla facilisi. Sed adipiscing diam donec
          adipiscing. Amet volutpat consequat mauris nunc congue nisi vitae
          suscipit. In fermentum et sollicitudin ac orci phasellus egestas
          tellus rutrum. Sed turpis tincidunt id aliquet risus feugiat. Aliquet
          enim tortor at auctor.
        </p>
      </section>
      <section className={sectionMarginMedium}>
        <HousingDisplacement Layout={CivicCardLayoutClassic} />
      </section>
      <section className={sectionMarginMedium}>
        <HomeLoanApprovals Layout={CivicCardLayoutClassic} />
      </section>
      <section className={sectionMarginMedium}>
        <BlackPopulationChange Layout={CivicCardLayoutClassic} />
      </section>
      <section css={sectionMarginMedium}>
        <HomeOwnershipRates Layout={CivicCardLayoutClassic} />
      </section>
      <section css={sectionMarginMedium}>
        <AduDistributions Layout={CivicCardLayoutClassic} />
      </section>
      <section css={sectionMarginMedium}>
        <HouseholdIncomeByRace Layout={CivicCardLayoutClassic} />
      </section>
    </PageLayout>
  </Fragment>
);

App.displayName = "App";

export default App;
