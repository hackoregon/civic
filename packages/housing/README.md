# Hack Oregon Housing Project 2016-2017 Season


![Build Status](https://travis-ci.org/hackoregon/housing-frontend.svg?branch=master)

This is a clone of the [Hack Oregon Starter kit](https://github.com/hackoregon/hackoregon-frontend-starter).

#### Guide
1. Get [Node 6.5 +](https://nodejs.org) - I recommend using [Node Version Manager](https://github.com/creationix/nvm#install-script):
2. `git clone https://github.com/hackoregon/team-budget-frontend.git`.
3. `nvm install 6.9.5` and `nvm use` (sets your node version)
4. install [yarn](https://yarnpkg.com/en/docs/install) (using yarn instead of npm for installing dependencies will help keep versions in sync more easily), and run `yarn` from inside the repo to install dependencies.
5. `npm start` - start dev mode (watching tests + linter)
6. `npm test` - run tests
7. `npm run coverage` - run tests w/ coverage

**Note:** When developing, go to [http://localhost:3000/collection/housing](http://localhost:3000/collection/housing) in order to see the project's index route.

#### Using the [Component Library](https://github.com/hackoregon/component-library) in your project
The component libary has been installed as a dependency from an npm build, make sure the version in package.json matches the latest version in the component library repo to have access to all the latest components.
(https://www.npmjs.com/package/@hackoregon/component-library)

To use a component in your project, import the precompiled component from the lib folder

Example:  importing the StoryCard component from the component library

```javascript
import StoryCard from '@hackoregon/component-library/lib/StoryCard/StoryCard';
```

#### Publishing to NPM
The project uses semver and will be published on NPM for consumption in civic-platform. Run the following commands sequentially:
```bash
  $ npm run bump # will provide you a prompt for version bumps & automatic git tagging + tag README with current version
  $ npm publish  # will publish to npm
```
