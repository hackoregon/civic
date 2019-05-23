import { format } from "d3-format";
import { timeFormat } from "d3-time-format";
import { startCase, toLower } from "lodash";

const scales = [
  [1000000000000, "trillion"],
  [1000000000, "billion"],
  [1000000, "million"]
];

const abbreviateLarge = number => {
  let num;
  let scale;

  for (let i = 0; i <= scales.length; i += 1) {
    if (Math.abs(number) >= scales[i][0]) {
      num = format(".2~r")(number / scales[i][0]);
      scale = scales[i][1]; // eslint-disable-line prefer-destructuring
      break;
    }
  }

  return `${num} ${scale}`;
};

const numeric = d => {
  let formatted;

  // We want to specifically format numbers greater than one million.
  if (Math.abs(d) >= 1000000) {
    formatted = abbreviateLarge(d);
  } else {
    formatted = format(",.0f")(d);
  }

  return formatted;
};

const scalesShort = [
  [1000000000000, "t"],
  [1000000000, "b"],
  [1000000, "m"],
  [1000, "k"]
];

const abbreviateLargeShort = number => {
  let num;
  let scale;

  for (let i = 0; i <= scalesShort.length; i += 1) {
    if (Math.abs(number) >= scalesShort[i][0]) {
      num = format(".2~r")(number / scalesShort[i][0]);
      scale = scalesShort[i][1]; // eslint-disable-line prefer-destructuring
      break;
    }
  }

  return `${num}${scale}`;
};

const numericShort = d => {
  let formatted;

  // We want to specifically format numbers greater than one thousand.
  if (Math.abs(d) >= 1000) {
    formatted = abbreviateLargeShort(d);
  } else {
    formatted = format(",.0f")(d);
  }

  return formatted;
};

const decimalToPercent = num => {
  let formatted;

  if (Number.isInteger(num)) {
    formatted = format(",~%")(num);
  } else {
    formatted = format(",.1%")(num);
  }

  return formatted;
};

const year = format(".0f");
const percentage = format(".0%");
const dollars = d => `$${numeric(d)}`;

const titleCase = str => startCase(toLower(str));
const unformatted = d => d;
const monthYear = timeFormat("%B %Y");

const civicFormat = {
  numeric,
  year,
  percentage,
  dollars,
  titleCase,
  unformatted,
  monthYear,
  numericShort,
  decimalToPercent
};

export default civicFormat;
