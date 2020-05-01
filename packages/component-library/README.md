> This package is being split up into smaller modules, and will be deprecated. See [this pull request](https://github.com/hackoregon/civic/pull/1200) for more details.

## Hack Oregon's React Component Library

---

Hack Oregon's [React](http://facebook.github.io/react/) Component Library encompasses platform components, a style guide, as well as data visualization components to be shared across projects.

For styling, we are using [Emotion](https://emotion.sh/).

The components that end up here are either built using [React Storybook](https://getstorybook.io) or were ported into the Storybook dev environment. This allows us to make cross project compatibile components. Additionally, this allows us to iterate on design outside the context of a specific project.

Documentation for usage of these components and visual examples will be available on the [Hack Oregon's Storybook](https://hackoregon.github.io/civic/).

# Installation

_Stable version:_

```
yarn add @hackoregon/component-library
```

_Latest version:_

```
yarn add @hackoregon/component-library@ci
```

# Usage

```
// import components individually
import {
  Button,
  BarChart,
  CivicStoryCard,
} from "@hackoregon/component-library";

// global styles
import "@hackoregon/component-library/assets/global.styles.css";
```
