# Civic
---

Welcome to Civic's platform monorepo.

This is a lerna based monorepo. Check out lernajs.io for any in-depth docs if you need to debug. Otherwise follow along:

## Setup

#### Use yarn & nvm for cross-platform uniformity
```bash
# install nvm -- https://github.com/creationix/nvm
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.6/install.sh | bash

# install yarn -- https://yarnpkg.com/en/docs/install
$ brew install yarn --without-node # you should be using nvm -- this installs yarn for usage with nvm
# For windows: https://yarnpkg.com/en/docs/install#windows-tab
```

## Install
```bash
nvm use # sets your node to match project

$ yarn bootstrap # install deps and link all packages
$ yarn build # build all the packages
$ yarn storybook # starts storybook for component-library
```

#### Typical workflow
```bash
# install and link all packages
$ yarn bootstrap

# open a separate shell &
$ yarn watch # this will watch all packages and update builds

# back in your original shell switch to the package you want to work with
$ cd packages/{package-name}

# open the folder in your editor for ex:
$ atom .

# run local project
$ yarn start
```