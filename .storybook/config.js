/* eslint-disable global-require */
/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */

import { configure } from '@storybook/react';
import '../packages/component-library/assets/global.styles.css';

function loadStories() {
  require('../packages/component-library/stories');
}

configure(loadStories, module);
