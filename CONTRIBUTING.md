# Contributing to Civic

Hello! Whether you have met with the Hack Oregon organization or not, you are welcome to contribute to the Civic Platform!
Bear in mind that this repo only encompasses the front-end web assets. There are many backend repos as well where data
is cleaned, analyzed, converted into databases, and made available through APIs. See the whole landscape in the
[Civic Platform Info repository](https://github.com/hackoregon/Civic-platform-info).

We use React and Redux as the backbone of our front-end technologies, but there are also many smaller libraries that any
contributor may want to learn more about. Here's a list of resources:

  1. [React](https://reactjs.org/)
  2. [Redux](https://redux.js.org/) (along with [Thunk](https://github.com/gaearon/redux-thunk))
  3. [React Router](https://github.com/ReactTraining/react-router/tree/v3/docs)
  4. [Emotion](https://emotion.sh/)
  5. [Victory Charts](https://formidable.com/open-source/victory/docs/victory-chart/)
  6. [Mapbox GL JS](https://www.mapbox.com/mapbox-gl-js/api/)
  7. [Storybook](https://storybook.js.org/)

Our testing tools are:

  1. [Mocha](https://mochajs.org/)
  2. [Chai](http://www.chaijs.com/)
  3. [Enzyme](http://airbnb.io/enzyme/)
  4. [JSDom](https://github.com/jsdom/jsdom)

A couple other libraries in use in the background are:

  1. [Lerna](https://lernajs.io/)
  2. [Webpack](https://webpack.js.org/)
  3. [Webpack Blocks](https://github.com/andywer/webpack-blocks)
  4. [Babel](https://babeljs.io/)

These libraries in the background aren't necessary to really understand, but knowing that the tools
are in use and how they work can help when debugging issues. Read more in our [Architecture guide](ARCHITECTURE.md).

## Adding components

At the heart of Civic is a [library of components](https://hackoregon.github.io/civic/). We showcase them all in a Storybook
to help designers plan Story Cards and project narratives. This showcase also aids developers when implementing Story Cards as
well as components. Creating a Storybook story for every component helps ensure a component can stand on its own and work
as imagined under a variety of inputs.

### What all is required from a component?

We strive for [stateless](https://code.tutsplus.com/tutorials/stateful-vs-stateless-functional-components-in-react--cms-29541),
reusable components that have been tested under a variety of conditions. These components are best for using as building blocks.

### Implementation

First, create a new folder in the `src` directory of the `component-library` package for the new component. Follow the conventions
that the other components follow:

  1. Capitalize the component name
  2. Create a JS file with the same name as the component

When writing the JS implementation of a component, there aren't any hard and fast rules, but there are some strong suggestions:

  1. Prefer a stateless, function component over a stateful, class component
  2. Specify the [`PropTypes`](https://reactjs.org/docs/typechecking-with-proptypes.html) for the component
  3. When styles are necessary, prefer Emotion over CSS
  4. Choose composition over inheritance
  5. Don't be afraid to break a large component down into smaller components that compose
  6. Expect a variety of prop inputs
  7. Expect a variety of layout usages
  8. Don't forget about mobile styles as well as mobile interactions

With these suggestions along with code review, you're sure to make something that will be useful for years to come!

### Testing

In the same component directory, make a test file named `<component>.test.js`.

Good unit tests will help you be confident your component works the way you think it does. Arguably even more important:
it will help future developers be confident that their broad changes or upgrades don't break your hard work.

A component that will stand the test of time should adhere to the Robustness Principle.

> Be conservative in what you do, be liberal in what you accept from others

Tests are a great way to ensure a component is in fact robust. Write unit tests that provide a wide range of prop values
for a component. When the component takes a number, test `0`, `1`, large numbers, and negative numbers. No matter how surprising
the inputs may be, the output should not surprise.

### Storybook

In the `stories` directory in the `component-library` package, make a story file named `<component>.story.js`.
Then, in the `index.js` file in the same `stories` directory, import your new story file and call the exported function.

Testing helps us make sure how code works. Stories make sure our designs works. They are useful for testing the user
experience of interactions as well as the end result of a variety of inputs. Varying input is especially important in
data visualization design. Even if any given chart type doesn't lend itself favorably for every data configuration,
keep the Robustness Principle in mind.

Storybook has [a variety of addons](https://storybook.js.org/addons/addon-gallery/) for adding interactivity to your story that
may help a designer or developer review and experiment with the behavior of the component the story is for.

A single story file can include multiple scenarios. Use this to your advantage to showcase a component under a variety of conditions.

### Rebuilding the Component Library

When making a new component, that component needs to be re-exported in [`packages/component-library/src/index.js`](packages/component-library/src/index.js).
This makes the component accessible to anyone importing the component via npm.

When making any change to a component in the component library, the changes need to be built and committed to source control. Since
the components are authored in ES6 but not necessarily imported with ES6, the components are prebuilt.

Build with `yarn build` while in the `packages/component-library` directory. This will generate changes in the `es` and `dist` directories.
Commit those changes.

Please make sure to commit changes to source code and changes to build artifacts in _separate commits_. This makes it much easier to read
through the git log and revert bad changes when necessary.

## Creating Story Cards

Story Cards a special kind of component that is reusable but is not composable. In a nutshell, a Story Card is a self-contained reusable asset
that tells a story with data. Story Cards come out of Hack Oregon's project work but are boxed up as Story Cards so they can be embedded in
other contexts.

To make a Story Card, start by making a new component in the appropriate project package. Then, make a React component that wraps around the
`StoryCard` component from the Component Library.

Story Cards can often be rather complex. When implementing a Story Card, make sure to think about all the UI elements that go into the card's design.
Make sure not to reinvent components that are already in the Component Library. Likewise, when the necessary UI elements aren't in the component
library, ask yourself if the element is reusable. If it is, it should probably be implemented alone in the component library, then imported and placed
in the story card.

## Creating Stories

Stories are scrolling narratives that tie multiple story cards together to tell the full story of a project. These are implemented as the `App` component
in each project package. It is crucial to use the `App` component for the Story as this component is imported by the respective Year package for the
project.

Stories have a fair amount of detail to them. They are responsible for page layout as well API actions.

## Making Changes to the Platform

The Platform refers to the packages in this repo that _are not_ project packages, year packages, or the component library. These are the packages that
enforce consistency, eliminate duplication, and allow the majority of development to be focused on components and stories. However, the platform
should never be considered done!

When making changes to platform packages, make sure to test changes against project packages, year packages, and Storybook.

## Submitting a Pull Request

Once a change has been implemented and tested, [open a Pull Request](https://help.github.com/articles/about-pull-requests/) on Github. Explain what
the change is and why it was made. Include screenshots when relevant, and never merge without first getting a design review and a code review!

Finishing a task and getting it merged is incredibly rewarding, and every contribution, no matter how small, assists in Hack Oregon's mission to
build civic data projects!
