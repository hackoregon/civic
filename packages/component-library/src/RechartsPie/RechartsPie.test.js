import React from 'react';
import { shallow } from 'enzyme';
import RechartsPie from './RechartsPie';

describe('Recharts Pie', () => {
  const { data, colors, styles, chartProportions } = {
    data: [{ name: 'Group A', value: 400 }],
    styles: { fontFamily: 'Roboto Condensed', fontSize: '8', color: '#706371', fill: '#706371' },
    colors: ['#a6cee3', '#1f78b4'],
    chartProportions: {
      chartWidth: 2,
      chartHeight: 1,
      iconSize: 0.075,
      pieInnerRadius: 0.2,
      pieOuterRadius: 0.4,
    },
  };

  const wrapper = shallow(
    <RechartsPie
      data={data}
      chartProportions={chartProportions}
      colors={colors}
      styles={styles}
    />,
  );

  it('should render a div', () => {
    expect(wrapper.find('div')).to.have.length(1);
  });

  it('should render a div with one child element', () => {
    expect(wrapper.find('div').children()).to.have.length(1);
  });

  it('should render a div with one child element that itself has two children elements', () => {
    expect(wrapper.find('div').children().props().children).to.have.length(2);
  });
});
