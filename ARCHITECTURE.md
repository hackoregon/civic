# Architecture

This guide gives a high-level overview of how all the pieces in this mono-repo come together to
ultimately create a website on the Internet.

## Deploy Targets

To explain how all the packages in the mono-repo came to be, it's easiest to work backwards,
starting with what it is this repo aims to make.

There are currently three deploy targets:

1. Storybook (Chromatic)
2. Civic 2017
3. Civic 2018

**Storybook (Chromatic):** Storybook includes collection of resuable and composable components that can be used in
any project to quickly create a rich and consistent experience. Component stories from across packages
are bundled into one Storybook and deployed to [Chromatic](https://chromatic.com).

**Civic 2017:** This is an express-based node service that hosts the 2017 projects. Express is only used to
serve assets and redirect all traffic to `/` so that React Router can then handle routing client-side.

**Civic 2018:** This is identical in architecture to the 2017 package. The only difference is the node service
hosts the 2018 projects. A [Netlify](https://netlify.com) deploy preview is generated for each pull request.

Both Civic deploy targets are deployed to [AWS ECS](https://aws.amazon.com/ecs/) to be hosted on the Internet.

## Reuseable Component Packages

Reusable components are split into focused packages

1. **ui-brand:** Brand assets, colors, and typography
2. **ui-cards:** Components for cards, Civic's modular data communication framework
3. **ui-charts:** Charts and other non-map data visualization components
4. **ui-core:** Common UI components
5. **ui-docs:** Design system documentation
6. **ui-maps** Maps and other geospatial data visualization components
7. **ui-themes** Themes and other common styling
8. **utils** Common utilities
9. **component-library** [DEPRECATED] A package that included all common components

## Year Packages

Year Packages are React/Redux packages much like all the project packages, except they are mostly focused on
assembling project packages with a unified router and redux store. This is also where non-project pages are
implemented, such as the home page or an about page.

### The Project Package Interface

For year packages to import arbitrary project packages, a project package must adhere to a consistent interface.
That interface is for the `index.js` (or main script if different) to export three properties:

1. **App:** The narrative story component
2. **Routes:** The child routes
3. **Reducers:** The redux reducers

### Creating a unified router

The Year package will import the `Routes` property from each project package. Using a predefined slug for
the package, these imported routes are set as child routes under the slug named route on the React Router
instance for the Year package.

### Creating a unified redux store

The Year package will import the `Reducers` property from each project package. Using the same predefined
slug as the router, the Year package will create a single Redux store with all project reducers defined under
that slug to avoid any naming conflicts.

Since this slug means the root state is contextual, the project packages are expected to check for the slug
on the root of the state object before assuming that the root of the state object is also the project root.
This is best achieved by using a base selector all other selectors are built on top of.

### Production Server

All source code needs to be processed with Webpack before it is ready to be served up by a browser. In development,
the express server invokes Webpack to build assets as well as uses Hot Module Replacement to make iterating
even faster. However, it is not necessary and a bad practice to require Webpack in production, so a separate
production server is present in Year Packages that expect prebuilt assets.

In development, the same dev server is used for both year packages as well as project packages.

## Dev Server

The dev server is a small express server that also invokes Webpack and handles hot module replacement. This is common
code that enforces consistent webpack file conventions and prevents duplicate code and code drift.

## Project Packages

Project packages are where the majority of code will live. These projects use Redux to add interactivity and interface
with APIs to create Story Cards and a single project narrative.

As mentioned, project packages on their own aren't deploy targets, or even complete React websites. They get imported
by Year packages, which tie everything together.

In order to make project packages servable on their own as well as enforce a common interface, a mock wrapper is used.

## Mock Wrapper

The Mock Wrapper is a small piece of React/Redux code that takes the App, Routes, and Reducers requirements of a Year
package and wires up a router and store like a Year package would.

## Webpack Common

Every project package and year package has a webpack config that is under 10 lines long. This is achieved by extracting
all the common Webpack requirements and moving them to a common package called `webpack-common`. Webpack Common provides
a standard issue Webpack configuration with few inputs for any deviations between projects and year packages.

Merging Webpack config files is a tricky problem since sometimes properties should merge, other times they should override,
and other times what is okay in JavaScript terms can result in something invalid in Webpack terms. This problem has been
solved by Webpack Blocks, which Webpack Common uses.

## Package Management

Despite all packages living in one repo, they are imported in other packages using npm/node conventions. This is achieved
by using [Lerna](https://lernajs.io/), which links packages locally as if they were already published to the npm registry.

Since the packages within Civic aren't expected to be used outside of Civic, no package actually ever has to be published
to npm.
