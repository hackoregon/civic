## Team Budget Front-End

[![Build Status](https://travis-ci.org/hackoregon/team-budget-frontend.svg?branch=master)](https://travis-ci.org/hackoregon/team-budget-frontend)

### Guide

1. Get [Node Version Manager](https://github.com/creationix/nvm#install-script).
2. `git clone https://github.com/hackoregon/team-budget-frontend.git`.
3. `nvm use` (sets your node version)
4. install [yarn](https://yarnpkg.com/en/docs/install) (using yarn instead of npm for installing dependencies will help keep versions in sync more easily), and run `yarn` from inside the repo to install dependencies.
5. `yarn start` - starts dev mode (watching tests + linter).
6. `yarn test` - runs tests.
7. `yarn run coverage` - runs tests and displays a coverage summary.

### Using the [Component Library](https://github.com/hackoregon/component-library) in your project

The component library has been installed as a dependency from the npm build version 0.0.6 (https://www.npmjs.com/package/@hackoregon/component-library)

To use a component in your project, import the component from its source in the lib folder.

Example: Importing the Header component from the component library  
`import Header from '@hackoregon/component-library/lib/Navigation/Header';`

### How to contribute

If you want to make any changes, please submit a Pull Request. See the GitHub documentation, if you do not know how to do that. For example, [Creating a pull request from a fork](https://help.github.com/articles/creating-a-pull-request-from-a-fork/) or more generally, [Collaborating with issues and pull requests](https://help.github.com/categories/collaborating-with-issues-and-pull-requests/).

### Background

This code is based on the [hackoregon-frontend-starter](https://github.com/hackoregon/hackoregon-frontend-starter) project, which is a template for Hack Oregon front-end development using React + Redux. The purpose of starting from that baseline is so that the different projects will share a common design.
