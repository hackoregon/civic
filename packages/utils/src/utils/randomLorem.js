import wallOfText from "./wallOfText";

const firstRepeatInWallOfText = wallOfText.split(" ").reduce((p, n, i) => {
  if (typeof p === "number") return p;
  if (p[n]) return i;
  // eslint-disable-next-line no-param-reassign
  p[n] = true;
  return p;
}, {});

const randomLorem = () =>
  wallOfText.split(" ")[
    Math.floor((Math.random() * 100) % firstRepeatInWallOfText)
  ];

export default randomLorem;
