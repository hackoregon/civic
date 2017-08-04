# Civic
---

Welcome to Civic's platform monorepo.

This is a lerna based monorepo. Check out lernajs.io for any in-depth docs if you need to debug. Otherwise follow along:

## Setup

```bash
nvm use
npm install
npm run bootstrap # install external deps and link all packages
npm run build # build all the packages
npm run storybook # starts storybook for component-library
```

## Test

```bash
npm test
```