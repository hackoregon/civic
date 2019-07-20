import React from "react";

export const wallOfText =
  "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
export const wallOfRichText = (
  <div>
    <strong>Lorem ipsum dolor sit amet</strong>, consectetur adipisicing elit,
    <em>sed do eiusmod tempor incididunt ut labore</em> et dolore magna aliqua.
    <ul>
      <li>Ut enim ad</li>
      <li>minim veniam, quis nostrud</li>
      <li>exercitation ullamco laboris</li>
    </ul>
    nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
    reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
    pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
    officia deserunt mollit anim id est laborum.
  </div>
);
const firstRepeatInWallOfText = wallOfText.split(" ").reduce((p, n, i) => {
  if (typeof p === "number") return p;
  if (p[n]) return i;
  // eslint-disable-next-line no-param-reassign
  p[n] = true;
  return p;
}, {});
export const randomLorem = () =>
  wallOfText.split(" ")[
    Math.floor((Math.random() * 100) % firstRepeatInWallOfText)
  ];

export const colors = [
  "#a6cee3",
  "#1f78b4",
  "#b2df8a",
  "#33a02c",
  "#fb9a99",
  "#e31a1c",
  "#fdbf6f",
  "#ff7f00",
  "#cab2d6",
  "#6a3d9a",
  "#ffff99",
  "#b15928",
  "#8dd3c7",
  "#fb8072",
  "#80b1d3",
  "#bebada",
  "#ffed6f",
  "#fdb462",
  "#b3de69",
  "#fccde5",
  "#d9d9d9",
  "#bc80bd",
  "#ccebc5",
  "#ffffb3"
];
export const randomizer = () => Math.random() * 100;
export const getColors = (datum, idx) =>
  // eslint-disable-next-line no-undef
  arguments.length === 2 ? colors[idx] : colors[datum];
export const getRandomValuesArray = (numsOf, func) =>
  [...new Array(numsOf)].map(func);
export const objectRandomizer = () => ({ x: randomLorem(), y: randomizer() });

export const getKeyNames = obj => {
  const keyNames = {};
  Object.keys(obj).forEach(key => {
    keyNames[key] = key;
  });
  return keyNames;
};
