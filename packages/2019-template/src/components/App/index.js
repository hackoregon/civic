import React from "react";

// eslint-disable-next-line import/no-extraneous-dependencies
import { cx, css } from "emotion"; // eslint-disable-line emotion/no-vanilla
import {
  PageLayout,
  PullQuote,
  CivicCardLayoutClassic
} from "@hackoregon/component-library";

import TemplateCard from "../TemplateCard";
import DemoCard from "../DemoCard";

import "@hackoregon/component-library/assets/global.styles.css";

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
  <PageLayout
    teamTitle="Template"
    heroTitle="🚧 Site Under Construction 🚜"
    heroSubtitle="Playground for building out the 2019 Template team frontend"
    overlay
  >
    <section className={cx(sectionBodyHeading, sectionMaxWidthSmall)}>
      <h2>Ullamcorper dignissim cras tincidunt?</h2>
    </section>
    <section className={cx(sectionMarginSmall, sectionMaxWidthSmall)}>
      <p className={paragraphStyle}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Elementum curabitur
        vitae nunc sed. Nisl condimentum id venenatis a condimentum vitae sapien
        pellentesque. Sapien eget mi proin sed libero enim sed faucibus turpis.
        Fermentum leo vel orci porta.
      </p>
    </section>
    <section className={cx(sectionMarginMedium, sectionMaxWidthMedium)}>
      <PullQuote
        quoteText="The lorem ipsum text is typically a scrambled section of De 
      finibus bonorum et malorum, with words altered, added, and removed to make 
      it nonsensical, improper Latin."
      />
    </section>
    <section className={cx(sectionMarginSmall, sectionMaxWidthSmall)}>
      <p className={paragraphStyle}>
        Dui accumsan sit amet nulla facilisi. Sed adipiscing diam donec
        adipiscing. Amet volutpat consequat mauris nunc congue nisi vitae
        suscipit. In fermentum et sollicitudin ac orci phasellus egestas tellus
        rutrum. Sed turpis tincidunt id aliquet risus feugiat. Aliquet enim
        tortor at auctor.
      </p>
    </section>
    <section className={sectionMarginMedium}>
      <TemplateCard Layout={CivicCardLayoutClassic} />
    </section>
    <section className={sectionMarginMedium}>
      <DemoCard Layout={CivicCardLayoutClassic} />
    </section>
  </PageLayout>
);

App.displayName = "App";

export default App;
