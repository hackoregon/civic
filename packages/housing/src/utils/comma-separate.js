import { format } from 'd3-format';

const formatCommaSeparated = format(',');

export default function commaSeparate(
  num,
  decimalPrecision,
  insistDecimalPrecision = false
) {
  if (!decimalPrecision) {
    return formatCommaSeparated(num);
  }

  if (insistDecimalPrecision) {
    const splitNumber = num.toFixed(decimalPrecision).split('.');
    return `${formatCommaSeparated(splitNumber[0])}.${splitNumber[1] || ''}`;
  }

  return formatCommaSeparated(num.toFixed(decimalPrecision));
}
