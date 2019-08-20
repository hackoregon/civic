import React from "react";

import { css } from "emotion";
import { Global } from "@emotion/core";
import { BrandTheme, PageLayout } from "@hackoregon/component-library";

import HousingDisplacement from "../HousingDisplacement";

const sectionMarginMedium = css`
  display: block;
  margin: 64px auto;
`;

const App = () => (
  <>
    <Global styles={BrandTheme} />
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
  </>
);

App.displayName = "App";

export default App;
