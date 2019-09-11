import { Fragment } from "react";

/** @jsx jsx */
import { jsx, css, Global } from "@emotion/core";
import {
  BrandTheme,
  PageLayout,
  PullQuote,
  CivicCardLayoutClassic // eslint-disable-line
} from "@hackoregon/component-library";
import HomeAppreciation from "../HomeAppreciation";
import HolcRedlining from "../HolcRedlining";
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
// const sectionBodyHeading = css`
//   margin: 80px auto 24px;
// `;
const paragraphStyle = css`
  line-height: 2;
  font-size: 18px;
`;

const App = () => (
  <Fragment>
    <Global styles={BrandTheme} />
    <PageLayout
      teamTitle="Housing"
      heroTitle="The Changing Complexion of Housing in Portland"
      heroSubtitle="Examining the Demographic Shifts of Populations and Disparities in Homeownership"
      overlay
    >
      {/* <section css={[sectionBodyHeading, sectionMaxWidthSmall]}>
        <h2>Ullamcorper dignissim cras tincidunt?</h2>
      </section> */}
      <section css={[sectionMarginSmall, sectionMaxWidthSmall]}>
        <p css={paragraphStyle}>
          It is an often-discussed subject that Portland residents of different
          racial and ethnic backgrounds have faced disparate systemic barriers
          to housing. Our 2019 Housing theme uses large public data sources to
          highlight some of the statistical realities and show the power of
          what’s possible with greater access to this data.
        </p>
      </section>
      <section css={[sectionMarginSmall, sectionMaxWidthSmall]}>
        <p css={paragraphStyle}>
          From 1990 til the present, Portland neighborhoods considered
          historically Black have been seeing steady declines in Black
          residents. Portland’s troubled history of systemic barriers to housing
          for communities of color has resulted in fewer Black residents having
          access to homeownership - a cornerstone of building personal wealth, a
          sense of security and place, and a cohesive community. While we have
          ended many of the explicitly discriminatory practices that denied
          access to homeownership for communities of color, there are still
          institutional lending practices that have a direct effect on the
          demographics of our neighborhoods.
        </p>
      </section>
      <section css={[sectionMarginMedium, sectionMaxWidthMedium]}>
        <PullQuote quoteText="There are still institutional lending practices that have a direct effect on the demographics of our neighborhoods." />
      </section>
      <section css={[sectionMarginSmall, sectionMaxWidthSmall]}>
        <p css={paragraphStyle}>
          Looking forward, Oregon is being recognized as a national leader in
          trying to bridge the gaps in housing accessibility by attempting to
          create a more diverse range of housing options. The{" "}
          <a href="https://olis.leg.state.or.us/liz/2019R1/Measures/Overview/HB2001">
            Oregon House Bill 2001
          </a>{" "}
          is an effort to create more, smaller units to increase the stock of
          affordable housing. Portland is a national leader in ADU construction,
          with the{" "}
          <a href="https://www.jchs.harvard.edu/state-nations-housing-2019">
            2019 State of the Nation’s Housing Report from Harvard’s Joint
            Center for Housing Studies
          </a>{" "}
          calling Portland “a frontrunner in these efforts, issuing permits for
          over 3,200 ADUs in 2008–2018.” At the time of this writing, Portland
          is also engaged in several efforts to increase options for greater
          density and diversity of units, such as the proposed{" "}
          <a href="https://www.portlandoregon.gov/bps/67728">
            Residential Infill
          </a>{" "}
          and the{" "}
          <a href="https://www.portlandoregon.gov/bps/71903">
            Better Housing by Design
          </a>{" "}
          projects.
        </p>
      </section>
      <section css={[sectionMarginSmall, sectionMaxWidthSmall]}>
        <p css={paragraphStyle}>
          We are undergoing big changes, as a city and a state; we invite you to
          explore these data with us and consider how policy and practice affect
          the lived realities of Portland residents.
        </p>
      </section>
      <section className={sectionMarginMedium}>
        <BlackPopulationChange Layout={CivicCardLayoutClassic} /> {/* SC 4 */}
      </section>
      <section className={sectionMarginMedium}>
        <HousingDisplacement Layout={CivicCardLayoutClassic} /> {/* SC 1 */}
      </section>
      <section css={sectionMarginMedium}>
        <HomeAppreciation Layout={CivicCardLayoutClassic} /> {/* SC 9 */}
      </section>
      <section className={sectionMarginMedium}>
        <HomeLoanApprovals Layout={CivicCardLayoutClassic} /> {/* SC 2 */}
      </section>
      <section css={sectionMarginMedium}>
        <HolcRedlining Layout={CivicCardLayoutClassic} /> {/* SC 8 */}
      </section>
      <section css={sectionMarginMedium}>
        <HouseholdIncomeByRace Layout={CivicCardLayoutClassic} /> {/* SC 10 */}
      </section>
      <section css={sectionMarginMedium}>
        <HomeOwnershipRates Layout={CivicCardLayoutClassic} /> {/* SC 5 */}
      </section>
      <section css={sectionMarginMedium}>
        <AduDistributions Layout={CivicCardLayoutClassic} /> {/* SC 6 */}
      </section>
    </PageLayout>
  </Fragment>
);

App.displayName = "App";

export default App;
