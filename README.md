# Civic [![Build Status](https://travis-ci.org/hackoregon/civic.svg?branch=master)](https://travis-ci.org/hackoregon/civic)

This is the home of the front-end code for the [CIVIC Platform](http://civicplatform.org/). It's organized in a monorepo using Yarn Workspaces, but it's ok if you don't know what that means yet.

**✨Demo Day⁇✨** _You may notice a lot of references to Demo Day! Our next Demo Day is September 11, 2019 in Portland, OR. [Get tickets!](www.civicsoftwarefoundation.org/#demoday)_

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

## Creating a new component

It's as easy as running `yarn component` from the root of the repo. You'll be prompted to name your component. When that's done, it will add new files as seen here:

```
civic
└───packages
    └───component-library
        └───src
        │   └───YourNewComponent
        │           YourNewComponent.js
        │           YourNewComponent.test.js
        └───stories
                YourNewComponent.story.js
                yourNewComponent.notes.md
```

It will export `YourNewComponent.js` from `component-library/src/index.js`. It was also set up the `YourNewComponent.story.js` for you in storybook `component-library/stories/index.js`. You can now run `yarn storybook` from the root and see YourNewComponent under BasicInputs/YourNewComponent. You can also run `yarn test` within `component-library/` and see that the YourNewComponent tests all pass. As you develop, make sure to update `YourNewComponent.story.js`, `yourNewComponent.notes.md`, and `YourNewComponent.test.js` so that future developers can easily understand how to use your work and rest easy that it is well tested!

## Creating a new card

There are two options to create a card: from API data and from local json data. Our new card generator makes it easy to load data from the API so we recommend that approach for ease of creation and the most up to date data.

### Using API data (recommended)

At the top of the repo run:

```bash
$ yarn card
```

This will bring up the prompt:

```bash
$ Which existing package should this card be in?: >
```

Type the name of a package that already exists in the `civic/packages/` directory (example `2019-transportation`) and press enter.

You will now see this prompt:

```bash
$ What will be the title of the card? (Capitalized With Spaces): >
```

Type the title of what you want to show on the new card and press enter. You may always change it later. Be aware that this choice will determine the names of newly created directories, files, and the import of those files into existing files.

You should see something like this now:

```bash
$ yarn card
yarn run v1.16.0
$ yarn hygen api-story-card with-prompt
$ /Users/Awesome_Volunteer/civic/node_modules/.bin/hygen api-story-card with-prompt
✔ Which existing package should this card be in?: · 2019-transportation
✔ What will be the title of the card? (Capitalized With Spaces): · Ducks Taking Buses

Loaded templates: _templates
      MANY INJECT AND ADDED MESSAGES
✨  Done in 37.18s.
```

If the package you chose isn't set up quite the way the generator expected you may need to make some modifications to files where code was injected but this should get you most of the way there. Now you can customize and hook in your own data.

### Using local data (not recommended)

The process is very similar to genrating an API data based card. At the top of the repo run:

```bash
$ yarn card:local-data
```

You'll then follow the same prompts as above. When you've finished you'll see a similar output to the one above.

If the package you chose isn't set up quite the way the generator expected you may need to make some modifications to files where code was injected but this should get you most of the way there. Now you can customize and hook in your own data.

## Creating a new Package

At the top of the repo run:

```bash
$ yarn new-package
```

This will bring up the prompt:

```bash
$ What do you want to name the new package? (e.g. YYYY-package-name): >
```

Type the name of the new package that you want to create and press enter.
✨ DONE ✨
You can now add a card if you want. Try it out using the [Creating a new card](#creating-a-new-card)

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
