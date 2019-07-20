# Civic [![Build Status](https://travis-ci.org/hackoregon/civic.svg?branch=master)](https://travis-ci.org/hackoregon/civic)

This is the home of the front-end code for the [CIVIC Platform](http://civicplatform.org/). It's organized in a monorepo using Yarn Workspaces, but it's ok if you don't know what that means yet.

# Let's make this better, together!

Civic magic happens when we work together. We welcome your collaborative contributions. We also have a [more technical contribution guide](https://github.com/hackoregon/civic/blob/master/CONTRIBUTING.md).

🐧 **I see something that could be better:**
The first step is [open an issue](https://github.com/hackoregon/civic/issues/new/choose), and tell us what you see that could be better. Tell us about your vision so that we can see what you see and help to improve it.

🐦 **I want to work on making something specific better:**
If there's already a [documented issue](https://github.com/hackoregon/civic/issues) about what you want to work on, assign yourself to let others what you're working on. If there's not an issue, open one and assign yourself.

🐤 **I want to work on making something better, but I'm not sure where to start:**
Check out our [open issues with the good-first-issue label](https://github.com/hackoregon/civic/issues?q=is%3Aissue+is%3Aopen+label%3Agood-first-issue) for things to work on and [open pull requests with the good-first-review label](https://github.com/hackoregon/civic/pulls?q=is%3Aopen+is%3Apr+label%3Agood-first-review) to review and collaborate with others on existing efforts.

🦜 **I've done something towards making this better:**
Fantastic! Share it with us by [opening a pull request](https://github.com/hackoregon/civic/compare) with what you've done so far, and let's work together to make it even better and incorporate it into the CIVIC Platform!

🦚 **I want to explore more things:**

[CIVIC Platform](http://civicplatform.org/) 👏 [Components and Style Guide (Storybook)](https://hackoregon.github.io/civic/) 👏 [Platform Architecture Guide](https://github.com/hackoregon/civic/blob/master/ARCHITECTURE.md) 👏 [Redux Guide](https://github.com/hackoregon/civic/blob/master/WORKING_WITH_REDUX.md) 👏 [Contributing Guide](https://github.com/hackoregon/civic/blob/master/CONTRIBUTING.md)

# Setup

## Development environment

### Prerequisites

Before you install and build, you'll need the following.

1. **bash**

   You will need a Unix shell (bash). For Mac, this can be Terminal.app. For Windows, you'll need to use [Windows Subsystem for Linux](https://docs.microsoft.com/en-us/windows/wsl/install-win10) (see issue #[53](https://github.com/hackoregon/civic/issues/53)).

2. **nvm and yarn**

   You will need the following tools installed in your Unix shell:

   - [nvm](https://github.com/creationix/nvm)
   - [yarn](https://yarnpkg.com/) > 1.0

   These tools make sure every contributor has identical dependency versions, include node and node packages.

3. **git**

   You will need to have [Git](https://git-scm.com/) installed in your bash environment.

### Install and build

🐸**GENTLE WARNING**🐸: Make sure you have met the prerequisites ☝️

```bash
# Clone the repository using either https or ssh
# https
$ git clone https://github.com/hackoregon/civic.git
# OR ssh
$ git clone git@github.com:hackoregon/civic.git

$ cd civic

# Sets your Node.js version to match what the project uses.
$ nvm use

# Installs all package dependencies and links cross-dependencies.
# Also builds the component library
$ yarn bootstrap

# This can take a while (approximately 5mins), so grab some coffee☕️, tea🍵 or another beverage of your choosing.

# If you're getting an error like this one: "Your lockfile needs to be updated, but yarn was run with `--frozen-lockfile`",
# you may consider running
$ yarn install
# and then
$ yarn bootstrap
```

## Setting up your text editor

In order to be the most productive, you’ll want to install some extensions or plug-ins for your text editor. These tools are already installed and configured project wide, so the only installation you’ll need is inside your text editor (don’t `npm install` or `yarn add` them). There are plug-ins or extensions available for the most commonly used editors (VS Code, Sublime Text, Vim, WebStorm, Atom, etc…)

🐸**GENTLE WARNING**🐸: Configuration still in progress. You may encounter linting errors.
You may want to turn off Prettier and ESLint in your editor for the time being

- EditorConfig — for consistency in settings like indentation line-endings
- ESLint — to show linting in your editor as you’re coding
- Prettier — for code formatting in your editor as you’re coding

## Working on a single package other than the component library

At this point, Yarn has prepared all packages in the monorepo.

Most developers working in this project will be contributing to one package at a time.

This is the command sequence that will allow you to build/run an individual package every time (for example, the `housing` package)
and work on it as if it was a standalone project:

```bash
$ cd packages/{package-name} # e.g. cd package/2018-disaster-resilience

# run local project
$ yarn start

# test local project
$ yarn test

# watch tests while working on them
$ yarn test --watch
```

## Working on the component library using Storybook

We are committed to a shared component library. This is achieved using the `component-library` package and React Storybook.
Run Storybook with the following command or [view it here](https://hackoregon.github.io/civic/):

```bash
# run this command from project root (civic)
$ yarn storybook
```

## Working on the component library and a project package simultaneuously

In separate terminals, run the commands in the **Working on a single package other than the component library** and **Working on the component library using Storybook** sections above. Project packages rely on the built version of the component library, so if you have updated the component library, and want to see your changes in the project package you are working on, you'll need to rebuild the component library. Once the component library build has finished, your project package will reload with the update components.

```bash
$ cd packages/component-library

# rebuild the component library
$ yarn build
```

## Project Layout

There are three types of packages right now:

1. **Project packages**: A React/Redux codebase that holds a collection of stories and API interactions for a single
   project in a Hack Oregon project cycle.
2. **Year package bundles**: A React/Redux codebase that bundles together all project packages for a given year. This
   is a unit that gets deployed to production.
3. **Utilities**: Common code that other projects depend on.

### Packages

Every package has its own README with further details on what the package is for and how it works. We'll be adding some new packages for the 2019 project season.

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
