import { format } from 'd3-format';

const scales = [
  [1000000000000, 'trillion'],
  [1000000000, 'billion'],
  [1000000, 'million'],
];

const abbreviateLarge = (number) => {
  let num;
  let scale;

  for (let i = 0; i <= scales.length; i += 1) {
    if (Math.abs(number) >= scales[i][0]) {
      num = format('.2~r')(number / scales[i][0]);
      scale = scales[i][1];
      break;
    }
  }

  return `${num} ${scale}`;
};

export const numeric = (d) => {
  let formatted;

  // We want to specifically format numbers greater than one million.
  if (Math.abs(d) >= 1000000) {
    formatted = abbreviateLarge(d);
  } else {
    formatted = format(',.0f')(d);
  }

  return formatted;
};

export const percentage = format('.0%');
export const dollars = d => `$${d}`;
