### Webpacker
---
###### v 0.0.1

Webpacker comes with a default config and some utilities. `Webpacker.reduceconfig` allows you to add to a config object so you can further modularize your webpack configs.

#### Install
```bash
$ npm install @hackoregon/webpacker --save-dev
```


```javascript
import { reduceConfig, defaultConfig } from '@hackoregon/webpacker';
import webpack from 'webpack';

const entryConfig = {
  entry: 'src/index.js'
}

const pluginsConfig = {
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false,
      },
    }),
  ]
}

const config = reduceConfig(defaultConfig, entryConfig, pluginsConfig);
```
