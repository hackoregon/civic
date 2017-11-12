# Civic

Welcome to Civic's platform monorepo.

This is a lerna based monorepo. Check out lernajs.io for any in-depth docs if you need to debug. Otherwise follow along:

## Setup

#### Use yarn & nvm for cross-platform uniformity
```bash

# install nvm -- https://github.com/creationix/nvm
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.6/install.sh | bash

# install yarn -- https://yarnpkg.com/en/docs/install
$ brew install yarn --without-node # you should be using nvm -- this installs yarn for usage with nvm
# For windows: https://yarnpkg.com/en/docs/install#windows-tab
```

## Install
```bash
nvm use # sets your node to match project

# This will bootstrap the project by installing all package dependencies and linking cross-dependencies.
$ yarn bootstrap
```

#### Typical workflow
```bash
# install and link all packages
$ yarn bootstrap

# open a separate shell &
$ yarn watch # this will watch all packages and update builds

# back in your original shell switch to the package you want to work with
$ cd packages/{package-name}

# open the folder in your editor for ex:
$ atom .

# run local project
$ yarn start
```

## Building packages

```bash
yarn build
```

Certain packages require an env set using the `BABEL_ENV` or `NODE_ENV` environment variables to run.
Please set those in scripts that need to run them and not set them in your .bashrc or global shell setting.

## Working on a Package
At this point, Lerna has prepared all packages in the monorepo. To now work on one, `cd` into the package directory,
and work on it as if it were a standalone project.

```bash
cd packages/{package-dir} # for example: cd packages/housing
npm start
```

## Using storybook 

We are committed to a shared component library. This is achieved using the `component-library` package and React Storybook.
Run Storybook with the following command:

```bash
yarn storybook
```

### Testing across all packages

To run all tests for all packages, use the following command:
```bash
npm test
```

Tests for individual packages can be run from within the package directory. Running all tests is useful for continuous integration
environments as well as verifying changes to common dependencies does not break packages. For example, run this after making changes
to a component in the component library to ensure that others packages are compatible with the changes made.
