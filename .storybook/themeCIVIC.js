import { create } from "@storybook/theming";
import logo from "../packages/component-library/assets/civic-logo-c.svg";

export default create({
  base: "light",

  brandTitle: "CIVIC Platform",
  brandUrl: "https://civicplatform.org/",
  //brandImage: "https://placehold.it/350x150",
  brandImage: logo
  //brandImage: "../packages/component-library/assets/civic-logo-c.svg"
});
