import { format } from 'd3-format';

export const numeric = (d) => {
  let formatted;

  if (d >= 1000000) {
    formatted = format('.2s')(d)
      .replace('M', ' million')
      .replace('.0', '');
  } else {
    formatted = format(',.0f')(d);
  }

  return formatted;
};

export const percentage = format('.0%');
export const dollars = d => `$${d}`;
