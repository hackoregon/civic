# Civic [![Build Status](https://travis-ci.org/hackoregon/civic.svg?branch=master)](https://travis-ci.org/hackoregon/civic)

This is the home of the front-end code for the [CIVIC Platform](https://civicplatform.org/). It's organized in a monorepo using Yarn Workspaces, but it's ok if you don't know what that means yet.

# ⚡ Rapid iteration in progress!

Currently, we're rapidly iterating to prepare improve the experience for future development! This might not be the best time to hop in as a first time contributor.

If you're interested in what we're doing and want to hear more when we're ready for more collaborative contributions, visit [Civic Software Foundation](https://civicsoftwarefoundation.org) and join our mailing list or apply to volunteer.

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

[CIVIC Platform](https://civicplatform.org/) 👏 [Components and Style Guide (Storybook)](https://master--5f55eec3d7d83100229d47fe.chromatic.com) 👏 [Platform Architecture Guide](https://github.com/hackoregon/civic/blob/master/ARCHITECTURE.md) 👏 [Redux Guide](https://github.com/hackoregon/civic/blob/master/WORKING_WITH_REDUX.md) 👏 [Contributing Guide](https://github.com/hackoregon/civic/blob/master/CONTRIBUTING.md)

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

# Sets your Node.js version to match what the project uses. You may need to install the appropriate version per npm instructions
$ nvm use

# Installs all package dependencies and links cross-dependencies.
# Also builds the component packages and mock-wrapper
$ yarn bootstrap

# This can take a minute, so take a stretch break (mental or physical)!
```

## Text editor additions

In order to be the most productive, you’ll want to install some extensions or plug-ins for your text editor. These tools are already installed and configured project wide, so the only installation you’ll need is inside your text editor (don’t `npm install` or `yarn add` them). There are plug-ins or extensions available for the most commonly used editors (VS Code, Sublime Text, Vim, WebStorm, Atom, etc…)

- ESLint — to show linting in your editor as you’re coding
- Prettier — for code formatting in your editor as you’re coding
- EditorConfig — for consistency in settings like indentation line-endings

# Development

## Working on a single package other than a component package

Most developers working in this project will be contributing to one package at a time.

This is the command sequence that will allow you to build/run an individual package every time (for example, the `2019-template` package)
and work on it as if it was a standalone project:

```bash
$ cd packages/{package-name} # e.g. cd package/2019-template

# run local project
$ yarn start

# watch tests while working on them
$ yarn test:watch
```

## Working on component packages using Storybook

We are committed to using shared component packages. This is achieved using the `ui-*` packages and React Storybook.
Run Storybook with the following command or [view it here](https://hackoregon.github.io/civic/):

```bash
# run this command from project root (civic)
$ yarn storybook
```

> Note that component packages were formerly bundled in a single component library package

## Working on a component package and a project package simultaneuously

In separate terminals, run the commands in the **Working on a single package other than a component package** and **Working on a component package using Storybook** sections above. Project packages rely on the built version of the component packages, so if you have updated a component package, and want to see your changes in the project package you are working on, you'll need to rebuild the component package. Once the component package build has finished, your project package will reload with the update components.

```bash
# watch for changes across component packages and rebuild as necessary
$ yarn watch
```

## Testing across all packages

To run all tests for all packages, use the following command from the project root:

```bash
yarn test
```

Tests for individual packages can be run from within the individual package's directory. Running all tests is useful for continuous integration environments as well as verifying changes to common dependencies does not break packages.

For example, run the above command at the root of the project after making changes to a component in the component package to ensure that others packages are compatible with the changes made.

## Creating a new component

It's as easy as running `yarn component` from the root of the repo. You'll be prompted to name your component, and select the package where it will be created. When that's done, it will add new files as seen here:

```
civic
└───packages
    └───<package-name>
        └───src
            └───YourNewComponent
                    YourNewComponent.js
                    YourNewComponent.stories.js
                    YourNewComponent.test.js
```

You can now run `yarn storybook` from the root and see YourNewComponent under Unsorted/Components/YourNewComponent. You can also run `yarn test` within `package-name/` and see that the YourNewComponent tests all pass. As you develop, make sure to update `YourNewComponent.stories.js` and `YourNewComponent.test.js` so that future developers can easily understand how to use your work and rest easy that it is well tested!

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

# Packages & Deployment

## Project Layout

There are four types of packages right now:

1. **Project packages**: A React/Redux codebase that holds a collection of stories and API interactions for a single
   project in a Hack Oregon project cycle.
2. **Year package bundles**: A React/Redux codebase that bundles together all project packages for a given year. This
   is a unit that gets deployed to production.
3. **Component Packages**: Reuseable React components and Storybook documentation
4. **Utilities**: Common code that other projects depend on.

### Packages

Every package has its own README with further details on what the package is for and how it works. New packages in development for the 2019 project season.

- Year Packages
  - [2018](packages/2018/README.md) <- despite the name, this package powers [civicplatform.org](civicplatform.org) in 2019 and beyond.
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
- Component Packages
  - [ui-brand](packages/ui-brand/README.md)
  - [ui-charts](packages/ui-charts/README.md)
  - [ui-core](packages/ui-core/README.md)
  - [ui-docs](packages/ui-docs/README.md)
  - [ui-maps](packages/ui-maps/README.md)
  - [ui-themes](packages/ui-themes/README.md)
- Utilities
  - [civic-sandbox](packages/civic-sandbox/README.md)
  - [civic-babel-presets](packages/civic-babel-presets/README.md)
  - [component-library](packages/component-library/README.md)
  - [dev-server](packages/dev-server/README.md)
  - [mock-wrapper](packages/mock-wrapper/README.md)
  - [webpack-common](packages/webpack-common/README.md)
  - [utils](packages/utils/README.md)

## Continuous Integration

Travis CI is configured to have a build pipeline for the component packages and one for each project year. Although most
commands are run using yarn scripts attached to a `package.json` file, due to the many steps required to run tests for
a specific set of packages, a Makefile is used instead.

## Continuous Delivery

Travis CI will deploy docker containers to ECS for each project year whenever the `master` branch builds successfully. [Storybook](https://master--5f55eec3d7d83100229d47fe.chromatic.com) also deploys via [Chromatic](https://www.chromatic.com/) when `master` builds successfully.

# Notes

**✨Demo Day⁇✨** _You may notice references to Demo Day! Our most recent Demo Day was September 11, 2019 in Portland, OR. [See highlights!](https://www.youtube.com/watch?v=99RFAwCJg-o)_
