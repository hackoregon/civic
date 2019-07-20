import React from "react";

import { css } from "emotion";
import { PageLayout } from "@hackoregon/component-library";

import HousingDisplacement from "../HousingDisplacement";

import "@hackoregon/component-library/assets/global.styles.css";

const sectionMarginMedium = css`
  display: block;
  margin: 64px auto;
`;

const App = () => (
  <PageLayout
    teamTitle="Housing"
    heroTitle="🚧 Site Under Construction 🚜"
    heroSubtitle="Playground for building out the 2019 Housing team frontend"
    overlay
  >
    <section className={sectionMarginMedium}>
      <HousingDisplacement />
    </section>
  </PageLayout>
);

App.displayName = "App";

export default App;
