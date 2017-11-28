# Civic

Welcome to Civic's platform monorepo.

This is a lerna based monorepo. Check out lernajs.io for any in-depth docs if you need to debug. Otherwise follow along:

## Project-wide Setup

```bash
git clone https://github.com/hackoregon/civic.git
cd civic
nvm use
yarn install
```

This will bootstrap the project by installing all package dependencies and linking cross-dependencies.

## Building Packages

NOTE: This appears to be optional - at least for Working on a Package - so you may be able to skip this for now.

```bash
npm run build
```

This will run `lerna run build`, which in turn runs `npm run build` in each package. **There is no need to run this
command if you will only be working in one package**.

Certain packages require an env set using the `BABEL_ENV` or `NODE_ENV` environment variables to run.

### Specify the environment for you session

```bash
export BABEL_ENV=development
npm run build
```

### Specify the environment for the command

```bash
BABEL_ENV=development npm run build
```

### Specify the environment for all sessions

Add `export BABEL_ENV=development` to your `.bashrc` file (or respective rc file for your shell).

## Working on a Package

At this point, Lerna has prepared all packages in the monorepo. To now work on one, `cd` into the package directory,
and launch it as if it were a standalone project.

```bash
cd packages/housing
nvm use
yarn start
```

## Using the Global Storybook

We are committed to a shared component library. This is achieved using the `component-library` package and React Storybook.
Run Storybook with the following command:

```bash
npm run storybook
```

### Testing across all packages

To run all tests for all packages, use the following command:

```bash
npm test
```

Tests for individual packages can be run from within the package directory. Running all tests is useful for continuous integration
environments as well as verifying changes to common dependencies does not break packages. For example, run this after making changes
to a component in the component library to ensure that others packages are compatible with the changes made.
