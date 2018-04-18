# Webpack Common

Since most packages have similar webpack configs, and since every project package ends up being a piece of a larger year package, it
makes sense to have a common webpack configuration to prevent configuration drift. This way we can be sure that integrating a project
with a year package will go smoothly.

Since it isn't realistic to expect every webpack configuration to be identical, due to potential differences in entry points and outputs,
webpack-common isn't a simple file. It's a set of functions and blocks from which configurations can be composed. This allows more control
than a single rigid export, but less control (and therefore less potential for drift) than webpack with no abstraction.

## Webpack Blocks

Webpack Common is built on top of [Webpack Blocks](https://github.com/andywer/webpack-blocks). Webpack Blocks takes care of the details involved
in merging multiple webpack configurations.