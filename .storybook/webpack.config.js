const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const { composeConfig, } = require('../packages/webpacker');
const styles = require('../packages/webpacker/lib/styles').default;
const images = require('../packages/webpacker/lib/images').default;

module.exports = composeConfig(images,styles);