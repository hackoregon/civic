## Hack Oregon's React Component Library
---


Hack Oregon's [React](http://facebook.github.io/react/) Component Library is a work in progress that encompasses platform components, a style guide, as well as data visualization components to be shared across projects.

For styling, we are using [CSS Modules](https://github.com/css-modules/css-modules).

The components that end up here are either built using [React Storybook](https://getstorybook.io) or were ported into the Storybook dev environment. We believe this will allow us to make cross project compatibile components.

Documentation for usage of these components and visual examples will be available on the [Hack Oregon's Storybook](https://hackoregon.github.io/component-library/).

### Contributing
Our issues/requests are tracked on waffle.io **==>** [![Stories in Ready](https://badge.waffle.io/hackoregon/component-library.png?label=ready&title=Ready)](https://waffle.io/hackoregon/component-library)

1. Get Node 6.5 + - I recommend using Node Version Manager.
2. git clone https://github.com/hackoregon/hackor-frontend-starter.git.
3. `npm i` or `yarn` - install with either
4. `npm start` - spin up the storybook dev environment with hot module replacement.
5. `npm test` - run tests while coding
6. Code/Add components in the src folder with .test files alongside the source code.
7. Add stories in the story folder with .story extension.
8. Make a pull request to master from feature branches.