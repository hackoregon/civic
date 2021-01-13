# @hackoregon/ui-tailwind-config

> Reusable TailwindCSS Config

This configuration adds or changes the following:

- Replaces Tailwind colors with CIVIC colors
- Replaces Tailwind shadows with CIVIC shadows
- Typography configuration for [prose classes](https://github.com/tailwindlabs/tailwindcss-typography#usage)
- Plugins:
  - `@tailwindcss/typography`

## Installation

1. Run `yarn add tailwindcss` (uses Tailwind v2)
2. Run `yarn add @hackoregon/ui-tailwind-config`

## Setup

1. Create a file named `tailwind.config.js`
2. Add the following

```javascript
module.exports = {
  presets: [require("@hackoregon/ui-tailwind-config")]
  // You can extend or override this config as needed
};
```

We recommend using PostCSS, but the [TailwindCSS Docs](https://tailwindcss.com/docs/installation) goes deep on different CSS preprocessors and bundlers if you need other options.

## Usage with PostCSS

### Configuring PostCSS

1. Create a file named `postcss.config.js`
1. Add the following

```javascript
module.exports = {
  plugins: [
    require("tailwindcss")("./tailwind.config.js"),
    require("autoprefixer")
  ]
};
```

### Creating the Style Sheet

1. Create a file somewhere in your application's source code named `civic.css`
1. Add the following

```css
/* Rubik for Headings */
@import url("https://fonts.googleapis.com/css?family=Rubik:300,300i,400,400i,500,500i,700,700i,900,900i");
/* Merriweather for paragraphs */
@import url("https://fonts.googleapis.com/css?family=Merriweather:300,300i,400,400i,700,700i,900,900i");
/* Roboto Condensed for data and tiny type */
@import url("https://fonts.googleapis.com/css?family=Roboto+Condensed:300,300i,400,400i,700,700i");
/* Roboto Mono for data and tiny type */
@import url("https://fonts.googleapis.com/css?family=Roboto+Mono:300,300i,400,400i,700,700i");

@import "tailwindcss/base";
@import "tailwindcss/components";
@import "tailwindcss/utilities";
```

All you need to do from there is add `import ./civic.css` to your application root and you're good
to go!

## Customization

You can extend or override anything anything you need to in your configuration. See [TailwindCSS Docs](https://tailwindcss.com/docs/presets#how-configurations-are-merged) for how configurations are merged.

```javascript
module.exports = {
  presets: [require("@hackoregon/ui-tailwind-config")],
  theme: {
    extend: {
      fontFamily: {
        source: ["Source Sans Pro", "sans-serif"]
      }
    }
  }
};
```
