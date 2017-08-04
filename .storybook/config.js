import { configure, setAddon, addDecorator } from '@kadira/storybook';
import infoAddon from '@kadira/react-storybook-addon-info';

setAddon(infoAddon);

function loadStories() {
  require('../packages/component-library/stories');
}

configure(loadStories, module);
