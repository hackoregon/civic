# Civic [![Build Status](https://travis-ci.org/hackoregon/civic.svg?branch=master)](https://travis-ci.org/hackoregon/civic)

This is the home of the front-end code for the [Civic Platform](http://civicplatform.org/). It's organized in a [Lerna](https://lernajs.io/) based mono-repo, but it's ok if you don't know what that means yet.

## Setup

### Development environment
Prerequisites you'll need in your development environment to use and contribute to this project.

1. **bash** 
	
	You will need a Unix shell (bash). For Mac, this can be Terminal.app. For Windows, you'll need to use [Windows Subsystem for Linux](https://docs.microsoft.com/en-us/windows/wsl/install-win10) (see issue #[53](https://github.com/hackoregon/civic/issues/53)).
2. **nvm and yarn** 
	
	You will need the following tools installed in your Unix shell:

	* [nvm](https://github.com/creationix/nvm)
	* [yarn](https://yarnpkg.com/) > 1.0
	
	These tools make sure every contributor has identical dependency versions, include node and node packages.

3. **git**   

	You will need to have Git installed and a GitHub account with [SSH keys setup for remote access](https://help.github.com/articles/connecting-to-github-with-ssh/).

### Install and build

```bash
# Clone the repository and navigate to the project root
$ git clone https://github.com/hackoregon/civic.git
$ cd civic

# Sets your Node.js version to match what the project uses (should also happen on clone)
$ nvm use

# Note for next two steps, if you get an error, try the same command again.

# Installs all package dependencies and links cross-dependencies
$ yarn bootstrap

# This will build all packages. Since some packages are used internally, they need to be built before the dependent packages are worked on. This operation takes while (~10 minutes), but only needs to be run at the project root once.
$ yarn build
```

## Working on a single package other than the component library

At this point, Lerna has prepared all packages in the monorepo.

Most developers working in this project will be contributing to one package at a time.

This is the command sequence that will allow you to build/run an individual package every time (for example, the `housing` package)
and work on it as if it was a standalone project:

```bash
$ cd packages/{package-name} # e.g. cd package/housing

# run local project
$ yarn start

# test local project
$ yarn test

# watch tests while working on them
$ yarn test --watch
```

## Working on the component library using storybook

We are committed to a shared component library. This is achieved using the `component-library` package and React Storybook.
Run Storybook with the following command or [view it here](https://hackoregon.github.io/civic/):

```bash
# run this command from project root (civic)
$ yarn storybook
```


## Project Layout

There are three types of packages right now:

1. **Project packages**: A React/Redux codebase that holds a collection of stories and API interactions for a single
   project in a Hack Oregon project cycle.
2. **Year package bundles**: A React/Redux codebase that bundles together all project packages for a given year. This
   is a unit that gets deployed to production.
4. **Utilities**: Common code that other projects depend on.

### Packages

Every package has its own README with further details on what the package is for and how it works.

  - Year Packages
    - [2018](packages/2018/README.md)
    - [2017](packages/2017/README.md)
  - Project Packages
    - [2018-neighborhood-development](packages/2018-neighborhood-development/README.md)
    - [2018-disaster-resilience](packages/2018-disaster-resilience/README.md)
    - [2018-transportation-systems](packages/2018-transportation-systems/README.md)
    - [2018-housing-affordability](packages/2018-housing-affordability/README.md)
    - [2018-local-elections](packages/2018-local-elections/README.md)
    - [2018-example-farmers-markets](packages/2018-example-farmers-markets/README.md)
    - [budget](packages/budget/README.md)
    - [emergency-response](packages/emergency-response/README.md)
    - [homelessness](packages/homelessness/README.md)
    - [housing](packages/housing/README.md)
    - [transportation](packages/transportation/README.md)
  - Utilities
    - [civic-sandbox](packages/civic-sandbox/README.md)
    - [civic-babel-presets](packages/civic-babel-presets/README.md)
    - [component-library](packages/component-library/README.md)
    - [dev-server](packages/dev-server/README.md)
    - [mock-wrapper](packages/mock-wrapper/README.md)
    - [webpack-common](packages/webpack-common/README.md)
    

## Testing across all packages

To run all tests for all packages, use the following command:

```bash
yarn test
```

Tests for individual packages can be run from within the individual package's directory. Running all tests is useful for continuous integration environments as well as verifying changes to common dependencies does not break packages.

For example, run the above command at the root of the project after making changes to a component in the component library to ensure that others packages are compatible with the changes made.

## Continuous Integration

Travis CI is configured to have a build pipeline for the component library and one for each project year. Although most
commands are run using yarn scripts attached to a `package.json` file, due to the many steps required to run tests for
a specific set of packages, a Makefile is used instead.

## Continuous Delivery

Travis CI will deploy docker containers to ECS for each project year whenever the `master` branch builds successfully.
