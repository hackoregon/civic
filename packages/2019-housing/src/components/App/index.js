import { Fragment } from "react";

/** @jsx jsx */
import { jsx, css, Global } from "@emotion/core";
import { BrandTheme, PageLayout } from "@hackoregon/component-library";

import HousingDisplacement from "../HousingDisplacement";

const sectionMarginMedium = css`
  display: block;
  margin: 64px auto;
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
      <section css={sectionMarginMedium}>
        <HousingDisplacement />
      </section>
    </PageLayout>
  </Fragment>
);

App.displayName = "App";

export default App;
