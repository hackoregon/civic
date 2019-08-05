import forEach from "lodash/forEach";

/*
 * Creates an object that can be used as follows:
 * ${media.xs} { ... }
 * ${media.sm} { ... }
 * ${media.md} { ... }
 * ${media.lg} { ... }
 * ${media.xl} { ... }
 */

const breakpoints = { xs: 320, sm: 768, md: 1200, lg: 1440, xl: 2400 };

const mediaQueries = {};
forEach(
  breakpoints,
  (bp, key) => (mediaQueries[key] = `@media (min-width: ${bp}px)`)
);

export default mediaQueries;
