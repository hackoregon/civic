import * as d3 from 'd3';

// constants
export const width = 960;
export const height = 640;
export const center = { x: width / 2, y: height / 2 };

// create nodes
export const createNodes = (rawData) => {
    // Use the max total_amount in the data as the max in the scale's domain
    // note we have to ensure the total_amount is a number.
  const maxAmount = d3.max(rawData, d => +d.total_amount);

    // Sizes bubbles based on area.
    // @v4: new flattened scale names.
  const radiusScale = d3.scalePow()
      .exponent(0.5)
      .range([2, 85])
      .domain([0, maxAmount]);

    // Use map() to convert raw data into node data.
  const myNodes = rawData.map(d => ({
    id: d.id,
    radius: radiusScale(+d.total_amount),
    value: +d.total_amount,
    percentage: d.percentage,
    name: d.bureau_title,
    color: d.color,
    x: Math.random() * 900,
    y: Math.random() * 800,
  }));

    // sort them descending to prevent occlusion of smaller nodes.
  myNodes.sort((a, b) => b.value - a.value);

  return myNodes;
};
