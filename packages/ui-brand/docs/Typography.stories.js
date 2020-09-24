import React from "react";

import TypographyStyleCommonSample from "./TypographyStyleCommonSample";
import TypographyStyleQuickUsage from "./TypographyStyleQuickUsage";
import TypographyStyleHeadings from "./TypographyStyleHeadings";
import TypographyStyleParagraphs from "./TypographyStyleParagraphs";

export default {
  title: "Design/Brand",

  parameters: {
    options: { showPanel: false }
  }
};

export const Typography = () => (
  <>
    <TypographyStyleQuickUsage />
    <TypographyStyleCommonSample />
    <TypographyStyleHeadings />
    <TypographyStyleParagraphs />
  </>
);
