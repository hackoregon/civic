import React from "react";
/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from "@storybook/react";
import { checkA11y } from "@storybook/addon-a11y";
import { LandingPage } from "../src";

const title = "Simple usage";

const demoCode = () => <LandingPage>Hello LandingPage</LandingPage>;

export default () =>
  storiesOf("CIVIC Platform Components/Landing Page", module)
    .addDecorator(checkA11y)
    .add(title, demoCode);
