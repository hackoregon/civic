import { storiesOf } from "@storybook/react";
import { checkA11y } from "@storybook/addon-a11y";

// DO NOT REMOVE OR MODIFY THIS COMMENT - hygen component generator import injection
import textFieldStory from "./TextField.story"; // TODO: Move this to the appropriate location
import formStory from "./Form.story"; // TODO: Move this to the appropriate location

storiesOf("Component Lib|Lab", module)
  .addParameters({ options: { showPanel: false } })
  .addDecorator(checkA11y);
formStory();
textFieldStory();
// DO NOT REMOVE OR MODIFY THIS COMMENT - hygen component generator story injection
