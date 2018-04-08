# Civic [![Build Status](https://travis-ci.org/hackoregon/civic.svg?branch=master)](https://travis-ci.org/hackoregon/civic)

Welcome to Civic's platform monorepo.

This is a lerna based monorepo. Check out lernajs.io for any in-depth docs if you need to debug. Otherwise follow along:

## Step 1: Setup

Non-standard prerequisites you'll need in your development environment to use and/or contribute to this project.

### Use yarn & nvm for cross-platform uniformity

These tools minimize the opportunity for individual developers to have non-uniform results when building from this repo.

```bash
# install nvm -- https://github.com/creationix/nvm
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.6/install.sh | bash

# install yarn -- https://yarnpkg.com/en/docs/install
$ brew install yarn --without-node # you should be using nvm -- this installs yarn for usage with nvm
# For windows: https://yarnpkg.com/en/docs/install#windows-tab
```

### Install and build

```bash
nvm use # sets your Node.js version to match what the project uses

# This will bootstrap the project by installing all package dependencies and linking cross-dependencies
$ yarn bootstrap

# This will build all shared components such as component-library that are used by other packages in this monorepo
# Without this, many packages will throw runtime errors when launched from a development environment
$ yarn build
```

## Step 2: working on a single package

At this point, Lerna has prepared all packages in the monorepo.

Most developers working in this project will be using and/or contributing to one package at a time.

This is the command sequence that will allow you to build/run/test an individual package every time (for example, the `housing` package) and work on it as if it was a standalone project:

```bash
# you can open a separate shell &
$ yarn watch # this will watch all packages and update builds

# back in your original shell, switch to the package you want to work with
$ cd packages/{package-name} # e.g. cd package/housing

# run local project
$ yarn start
```

## Other Issues

### Building packages

```bash
yarn build
```

Note: certain packages require an env set using the `BABEL_ENV` or `NODE_ENV` environment variables to run.
Please set those in scripts that need to run them and not set them in your `.bashrc` or global shell setting.

### Using storybook

We are committed to a shared component library. This is achieved using the `component-library` package and React Storybook.
Run Storybook with the following command:

```bash
yarn storybook
```

### Testing across all packages

To run all tests for all packages, use the following command:

```bash
yarn test
```

Tests for individual packages can be run from within the individual package's directory. Running all tests is useful for continuous integration environments as well as verifying changes to common dependencies does not break packages.

For example, run the above command at the root of the project after making changes to a component in the component library, to ensure that others packages are compatible with the changes made.
