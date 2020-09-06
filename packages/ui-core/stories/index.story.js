import { storiesOf } from "@storybook/react";

// DO NOT REMOVE OR MODIFY THIS COMMENT - hygen component generator import injection
import dialogStory from "./Dialog.story"; // TODO: Move this to the appropriate location
import selectFieldStory from "./SelectField.story"; // TODO: Move this to the appropriate location
import buttonNewStory from "./ButtonNew.story";
import badgeStory from "./Badge.story";
import buttonStory from "./Button.story";
import checkboxStory from "./Checkbox.story";
import collapsableStory from "./Collapsable.story";
import dropdownStory from "./Dropdown.story";
import notebookPreviewStory from "./NotebookPreview.story";
import placeholderStory from "./Placeholder.story";
import pullQuoteStory from "./PullQuote.story";
import radioButtonGroupStory from "./RadioButtonGroup.story";
import selectStory from "./Select.story";
import sliderStory from "./Slider.story";
import chipcomponentstory from "./ChipComponent.story";

storiesOf("Component Lib/Basic Inputs", module).addParameters({
  options: { showPanel: false }
});
buttonStory();
buttonNewStory();
checkboxStory();
dropdownStory();
radioButtonGroupStory();
selectStory();
selectFieldStory();
sliderStory();
// DO NOT REMOVE OR MODIFY THIS COMMENT - hygen component generator story injection

storiesOf("Component Lib/Common UI", module).addParameters({
  options: { showPanel: false }
});
notebookPreviewStory();
dialogStory();
badgeStory();
collapsableStory();
placeholderStory();
pullQuoteStory();
chipcomponentstory();
