import addons from "@storybook/addons";
import { themes } from "@storybook/theming";
import themeCivic from "./themeCIVIC";

addons.setConfig({
  theme: themeCivic,
  showNav: true,
  showRoots: true,
  showPanel: true
});
