# 🌟 civic Archetype 🌟

Configurations and utilities for harnessing civic through archetypal patterns.

## Installation

```
npm install -S @hackoregon/civic-scripts @hackoregon/civic
```

In your package.json you can add scripts thus:

```
{
  "name": "@hackoregon/your-application-name",
  "scripts": {
    "build:prod": "civic build -p",
    "watch": "civic build -w",
    ...etc,
  },
}
```

## Configuring your application

### Directory Structure

Any file/directory marked with an asterisk are required files while the rest of the tree is optional but is considered a good starting point for your application.

```
.
├── .civic
│   ├── webpack.config.dev.js
│   ├── webpack.prod.dev.js
│   └── mocha.conf.js
├── dist
├── lib
├── public
├── src *
│   ├── global-components
│   ├── your-application-name *
│   │   ├── containers
│   │   ├── routes
│   │   ├── state
│   │   └── index.js *
│   ├── client.dev.js
│   ├── client.prod.js
│   ├── server.js
│   ├── renderer.js
│   └── routes.js *
├── .babelrc
├── .eslintrc
└── package.json *
```

Tests must either be co-located in with your application's `src` files or preferably placed in a sub-directory of `__tests__` and always appended with a `.test` in the file, for example `MyContainer.js` should have a test named `MyContainer.test.js`.

As your application can and should become it's own npm module, care must be taken as to how to structure your code to ease its exportability. The meat and bones of your application in this application would live in `src/your-application-name` and the code herein contained will be consumed by other applications. When composed together with other application-modules, your application should be agnostic about the process of being bootstrapped to the server or the client nor needn't care about any global components, such as a footer or header, that are in this example located in `src/global-components`.

Separate entry points are required for your client-side application. It is much better to write your entry-point twice in this case to be thoroughly explicit about what does and does *not* get bundled into your production application.

`lib` and `dist` folders will be automatically generated and contain your application's transpiled code for local use and for use via npm respectively. `public` will also be auto-generated and contain your client-side JavaScript bundles. Given the above folder tree, your application's `package.json` would look like:

```
{
  "name": "@hackoregon/your-application-name",
  "main": "dist/index.js", // this resolves any require/import statements correctly
  "civic": {
    "dist": "src/your-application-name" // tell babel where the entry directory is
  },
  { ... }
}
```

### Child Application Registry

Specified in your application's `package.json` under `civic.modules`, your application can optionally specify an array of modules that are considered to be children for ease of linking files locally. The application-modules should be placed as siblings to your composed application.

```
{
  "name": "@hackoregon/your-application-name",
  "main": "dist/index.js",
  "civic": {
    "dist": "src/your-application-name",
    "modules": [
      "@hackoregon/child-application-name",
      "@hackoregon/yet-another-child-application",
      "@hackoregon/some-more-application"
    ]
  },
  { ... }
}
```

### restify

Optionally specified in a development environment but required in a production environment, your server configuration must be placed in your `src/server.js` file. The file should match the API of civic's server with the following keys:

```
// this configuration can use ESM syntax and is placed in the `src` directory as a result
module.exports = {
  serverConfig: { ... },
  lifecycleFns: { ... },
};

// using ESM syntax
export default {
  serverConfig: { ... },
  lifecycleFns: { ... },
};
```

### webpack

Your application can either extend the default webpack configuration or replace it entirely. By default, `@hackoregon/civic-scripts` ships with a well-balanced flavor of webpack that includes a common, vendor, and app bundle. The vendor bundle includes React, React-Router, Redux, React-Redux, and Immutable and can be easily cached across applications. In the future, the vendor bundle will become a DLL-like file available and cached on an S3 instance.

To make changes to the archetypal configuration, place the following files in your `.civic` configuration directory:

* `webpack.dev.config.js`
* `webpack.prod.config.js`

If your application needs finer grained control over the webpack configuration, export a function that returns your new configuration; you can either choose to extend the archetypal configuration or return a new one completely:

```
module.exports = function alternateConfig(civicWebpackConfig: object, environment: string) {
  return {
    ...civicWebpackConfig,
    loaders: [ ... ],
  };
}
```

Extending and/or altering the aforementioned forbidden entries within the core's configuration may void your warranty.

### ESLint

`@hackoregon/civic-scripts` uses [Airbnb's](https://github.com/airbnb/javascript) mostly-sane ESLint configurations. In your project, simply extend your `.eslintrc` with the core configs and throw on any configurations your team particularly likes. In this example, we're throwing out a few arrow-function rules and declaring safe globals.

```
{
  "extends": "./node_modules/@hackoregon/civic-scripts/configs/eslint/.eslintrc",
  "rules": {
    "prefer-arrow-callback": 0,
    "arrow-body-style": 0
  },
  "globals": {
    "__DEV__": true,
    "it": true,
    "describe": true,
    "beforeEach": true,
    "afterEach": true
  }
}

```

### Babel

Extending or even including a `.babelrc` file or configuration for Babel is optional as the core supplied utilities will take care of any transpilation that needs to happen. As most of the client-side configuration for transpiling code is handled by webpack, there's little need to extend your application's `.babelrc` past the core's which include the plugins `react`, `stage-1`, and `es2015`. If needed, however, you can extend it thus:

```
{
  "extends": "./node_modules/@hackoregon/civic-scripts/configs/babel/.babelrc",
  "presets": [ ... ]
}
```

### Mocha

The core is ready for server-side unit tests with a standard suite of [Mocha](https://mochajs.org/), [Sinon](http://sinonjs.org/docs/), [Chai (expect)](http://chaijs.com/api/bdd/), and [Enzyme](http://airbnb.io/enzyme/). Chai includes extra assertion styles for Sinon ([`sinon-chai`](https://github.com/domenic/sinon-chai)) and Immutable ([`chai-immutable`](https://github.com/astorije/chai-immutable)).

`chai`, `expect`, `enzyme`, and `sinon` are placed within the global scope for tests to reduce a bit of boilerplate in your tests and you can extend configuration as needed. In your civic configuration directory, place a file named `mocha.conf.js` with the following signature:

```
const someChaiExtension = require('some-chai-extension');

global.chai.use(someChaiExtension);
```

### Burnside (coming soon)

We'll probably use [Burnside](https://bitbucket.nike.com/projects/WEBCD/repos/burnside/browse).

## Bin Scripts

<!--- Mind the pipes, dashes, etc., we're making markdown tables! -->

Command | Purpose
--- | ---
`civic start` | Runs the experience server
`civic test` | Runs server-based unit tests in the standard testing suite of [Mocha](https://mochajs.org/), [Sinon](http://sinonjs.org/docs/), [Chai (expect)](http://chaijs.com/api/bdd/), and [Enzyme](http://airbnb.io/enzyme/). Chai includes extra assertion styles for Sinon ([`sinon-chai`](https://github.com/domenic/sinon-chai)) and Immutable ([`chai-immutable`](https://github.com/astorije/chai-immutable)). Any options that can be passed to Mocha can also be passed to the archetypal test configuration.
`civic module` | Runs your application through Babel and exports it to your `./dist` folder. Configured correctly, you'll now be able to `npm publish` your application as a module for consumption by other applications. Optionally pass a `--watch` flag to watch your application files and incrementally build them
`civic build` | Run webpack to build your client-side JavaScript bundles, flag with `--watch` for continual new builds and `--hot` for for a hot-reloading webpackDevServer
`civic coverage` | Runs unit tests and outputs an lcov report, if your application needs advanced reporting from `nyc`/`istanbul`, your application should include `nyc` as a dev dependency and run `nyc npm test` where `npm test` is an extended configuration of Mocha
`civic lint` | Lints your project against rules specified in your application's `.eslintrc` or against the core's if none is present
`civic burnside` | (coming soon) Runs client-side functional tests
`civic link` | (coming soon) Runs `npm link <packageName>` on all modules specified in the application's module registry
`civic publish` | (coming soon) Compiles your module, tags the release, and uploads it to npm or any private variation thereof

### Options

Option | Default | Description
--- | --- | ---
`--watch`, `-w` | `null` | For commands that support it, such as `test` and `module`, will update said commands on source-changes, this flag will be ignored by other commands that don't support it
`--production`, `-p` | `null` | For commands that support it, such as `start` and `build`, will set `process.env.NODE_ENV` equal to `production`
`--hot`, `-h` | `null` | Enable a hot-reloading webpackDevServer
`--disable-ssr` | `null` | forces the experience server to only serve up a static html page. No React components will be rendered/harmed when this is enabled. Or disabled as it were.
`--server-only` | `null` | starts only the experience server
`--server-address` | `http://localhost` | For webpack, this is the expected path for your static assets. If running a webpackDevServer or just bundling files. Your experience server, either local or remote, needs to be able to hit this address to be able to resolve client-side JavaScript
`--public-path` | `./public` | local file path from which static assets will be served
`--webpack-dev-port` | `3001` | When running locally either via a webpackDevServer, this is the port your static assets will be served on
`--port` | `8080|3000` | 8080 and 3000 for production/development respectively, this is the port where your experience server will run
`--dashboard` | null | (coming soon) run your webpackDevServer with a dashboard
