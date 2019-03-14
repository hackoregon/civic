import { format } from 'd3-format';
import { timeFormat } from 'd3-time-format';
import { startCase, toLower } from 'lodash';

const scales = [
  [1000000000000, 'trillion'],
  [1000000000, 'billion'],
  [1000000, 'million'],
];

const abbreviateLarge = number => {
  let num;
  let scale;

  for (let i = 0; i <= scales.length; i += 1) {
    if (Math.abs(number) >= scales[i][0]) {
      num = format('.2~r')(number / scales[i][0]);
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
    formatted = format(',.0f')(d);
  }

  return formatted;
};

const year = format('.0f');
const percentage = format('.0%');
const dollars = d => `$${d}`;

const titleCase = str => startCase(toLower(str));
const unformatted = d => d;
const monthYear = timeFormat('%B %Y');

const civicFormat = {
  numeric,
  year,
  percentage,
  dollars,
  titleCase,
  unformatted,
  monthYear,
};

export default civicFormat;
