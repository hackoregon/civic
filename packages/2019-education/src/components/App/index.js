import { Fragment } from "react";

/** @jsx jsx */
import { jsx, css, Global } from "@emotion/core";
import {
  BrandTheme,
  PageLayout,
  PullQuote,
  CivicCardLayoutVisualizationOnly // eslint-disable-line
} from "@hackoregon/component-library";
import DoProgramsLikeThisMatterAtPolicyLevel from "../DoProgramsLikeThisMatterAtPolicyLevel";
import WhatElseSurprisedYouAboutProgramOutcomes from "../WhatElseSurprisedYouAboutProgramOutcomes";
import WhatSurprisedYouAboutProgramOutcomes from "../WhatSurprisedYouAboutProgramOutcomes";
import IsThereEvidenceTheProgramWorked from "../IsThereEvidenceTheProgramWorked";

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
      teamTitle="Education"
      heroTitle="Data Collaborative Tool Demo"
      heroSubtitle="Better Data For Better Outcomes"
      overlay
    >
      <section css={[sectionMarginMedium, sectionMaxWidthMedium]}>
        <PullQuote
          quoteText="We believe in the power of data, value of collaboration, and the potential of people. We think we can do better for today’s students. That’s why we’re launching a new venture — the Education Data Collaborative."
          url="//www.civicdatacollaborative.org"
        />
      </section>
      <section css={[sectionBodyHeading, sectionMaxWidthSmall]}>
        <h2>Meet Jordan</h2>
      </section>
      <section css={[sectionMarginSmall, sectionMaxWidthSmall]}>
        <p css={paragraphStyle}>
          {`Meet Jordon, an education researcher with 15 years of working with
          schools and education programs all over the country.`}
        </p>
        <p css={paragraphStyle}>
          {`Jordan is helping a nonprofit organization that piloted a program to
          help newcomers (immigrants) understand and navigate their public
          schools. The program wants to know whether it’s working. Whether the
          kids and families who participate benefit.`}
        </p>
      </section>
      <section css={sectionMarginMedium}>
        <IsThereEvidenceTheProgramWorked
          Layout={CivicCardLayoutVisualizationOnly}
        />
      </section>
      <section css={[sectionBodyHeading, sectionMaxWidthSmall]}>
        <h2>What else surprised you about program outcomes?</h2>
      </section>
      <PullQuote
        quoteText="In our Theory of Change, we designed for 5th graders. It turned our, our
      intervention is best for 1st-3rd graders at only 3-5 hours/week."
        url="//www.civicdatacollaborative.org"
        attribution="Jordon, in a report to funders"
      />
      <section css={sectionMarginMedium}>
        <WhatSurprisedYouAboutProgramOutcomes
          Layout={CivicCardLayoutVisualizationOnly}
        />
      </section>
      <section css={sectionMarginMedium}>
        <WhatElseSurprisedYouAboutProgramOutcomes
          Layout={CivicCardLayoutVisualizationOnly}
        />
      </section>
      <section css={sectionMarginMedium}>
        <DoProgramsLikeThisMatterAtPolicyLevel
          Layout={CivicCardLayoutVisualizationOnly}
        />
      </section>
    </PageLayout>
  </Fragment>
);

App.displayName = "App";

export default App;
