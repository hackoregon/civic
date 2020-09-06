import React from "react";
import { storiesOf } from "@storybook/react";

// DO NOT REMOVE OR MODIFY THIS COMMENT - hygen component generator import injection
import ColorThemeStyle from "./ColorThemeStyle.story";
import LogosStyle from "./LogosStyle.story";
import TypographyStyleCommonSample from "./TypographyStyleCommonSample.story";
import TypographyStyleQuickUsage from "./TypographyStyleQuickUsage.story";
import TypographyStyleHeadings from "./TypographyStyleHeadings.story";
import TypographyStyleParagraphs from "./TypographyStyleParagraphs.story";

// Branding
storiesOf("Design/Brand", module)
  .addParameters({ options: { showPanel: false } })
  .add("Logos", () => <LogosStyle />)
  .add("Color Theme", () => <ColorThemeStyle />)
  .add("Typography", () => (
    <>
      <TypographyStyleQuickUsage />
      <TypographyStyleCommonSample />
      <TypographyStyleHeadings />
      <TypographyStyleParagraphs />
    </>
  ));
// DO NOT REMOVE OR MODIFY THIS COMMENT - hygen component generator story injection
