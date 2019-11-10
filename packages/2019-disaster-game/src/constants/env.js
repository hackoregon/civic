/* eslint-disable no-console */
// Static site configuration as set in the environment of the server
// TODO: This is currently written under the assumption that this module
// will be lazy-evaluated after the DOM is ready. This isn't necessarily
// true and could lead to some bewildering debugging.
const env = {};

const configMetaEl = document.head.querySelector('[name="config/environment"]');
if (configMetaEl) {
  try {
    Object.assign(env, JSON.parse(decodeURIComponent(configMetaEl.content)));
  } catch (err) {
    console.warn(
      `Could not parse config/environment as JSON:\n\n${configMetaEl.content}`
    );
  }
}

export default env;
