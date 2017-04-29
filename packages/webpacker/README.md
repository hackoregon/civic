### Webpacker
---
###### v 0.0.1

Webpacker comes with a default config and some utilities.

`Webpacker.composeConfig` allows you to add to a config object so you can further modularize your webpack configs.

#### Install
```bash
$ npm install @hackoregon/webpacker --save-dev
```


```javascript
// entry.js
export default {
  entry: 'src/index.js'
}

// plugins.js
import webpack from 'webpack';

export default {
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false,
      },
    }),
  ]
}

// webpack.config.js
import { composeConfig, defaultConfig } from '@hackoregon/webpacker';
import pluginsConfig from './plugins'
import entryConfig from './entry'

export default composeConfig(
  defaultConfig,
  entryConfig,
  pluginsConfig
);
```
